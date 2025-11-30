/**
 * Promotions API - GET all promotions with filters
 * GET /api/promotions
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Promotion from '@/models/Promotion';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const isActive = searchParams.get('isActive') === 'true';
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filter: any = {};

    if (searchParams.has('isActive')) {
      filter.isActive = isActive;
      filter.validFrom = { $lte: new Date() };
      filter.validUntil = { $gte: new Date() };
    }

    if (category) filter.applicableCategories = category;

    const skip = (page - 1) * limit;

    const promotions = await Promotion.find(filter)
      .sort({ validUntil: 1 })
      .skip(skip)
      .limit(limit);

    const total = await Promotion.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: promotions,
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
    console.error('Error fetching promotions:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotions' },
      { status: 500 }
    );
  }
}

/**
 * Promotions API - Create a new promotion
 * POST /api/promotions
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const data = await request.json();

    const required = ['title', 'code', 'discount', 'validFrom', 'validUntil'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const promotion = await Promotion.create({
      ...data,
      code: data.code.toUpperCase(),
      totalUsed: 0,
    });

    return NextResponse.json(
      { success: true, data: promotion },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create promotion' },
      { status: 500 }
    );
  }
}
