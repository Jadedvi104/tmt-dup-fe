/**
 * Reviews API - GET all reviews with filters
 * GET /api/reviews
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Review from '@/models/Review';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const tourId = searchParams.get('tourId');
    const guideId = searchParams.get('guideId');
    const minRating = searchParams.get('minRating');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filter: any = {};

    if (tourId) filter.tourId = tourId;
    if (guideId) filter.guideId = guideId;
    if (minRating) filter.rating = { $gte: parseInt(minRating) };

    const skip = (page - 1) * limit;

    const reviews = await Review.find(filter)
      .populate('reviewerId', 'firstName lastName profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Review.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: reviews,
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
    console.error('Error fetching reviews:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    );
  }
}

/**
 * Reviews API - Create a new review
 * POST /api/reviews
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const data = await request.json();

    const required = ['tourId', 'guideId', 'reviewerId', 'rating', 'title', 'comment'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const review = await Review.create(data);

    // Update tour average rating
    const allReviews = await Review.find({ tourId: data.tourId });
    const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;

    await Review.collection.updateOne(
      { _id: review._id },
      { $set: { verified: true } }
    );

    return NextResponse.json(
      { success: true, data: review },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating review:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    );
  }
}
