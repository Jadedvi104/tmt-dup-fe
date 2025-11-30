/**
 * Tours API - GET all tours with filters
 * GET /api/tours
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Tour from '@/models/Tour';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const rating = searchParams.get('rating');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search');

    // Build filter
    const filter: any = { isActive: true, isListed: true };

    if (category) filter.category = category;
    if (city) filter['destination.city'] = city;
    if (minPrice || maxPrice) {
      filter['price.amount'] = {};
      if (minPrice) filter['price.amount'].$gte = parseInt(minPrice);
      if (maxPrice) filter['price.amount'].$lte = parseInt(maxPrice);
    }
    if (rating) filter.averageRating = { $gte: parseFloat(rating) };
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (page - 1) * limit;

    const tours = await Tour.find(filter)
      .populate('guideId', 'firstName lastName profileImage averageRating')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Tour.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: tours,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tours:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tours' },
      { status: 500 }
    );
  }
}

/**
 * Tours API - Create a new tour
 * POST /api/tours
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const data = await request.json();

    // Validate required fields
    const required = ['title', 'description', 'category', 'price', 'duration', 'destination', 'guideId'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate slug
    const slug = data.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-');

    const tour = await Tour.create({
      ...data,
      slug: `${slug}-${Date.now()}`,
    });

    return NextResponse.json(
      { success: true, data: tour },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create tour' },
      { status: 500 }
    );
  }
}
