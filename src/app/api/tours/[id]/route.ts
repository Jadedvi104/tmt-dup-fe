/**
 * Tours API - GET, UPDATE, DELETE a specific tour
 * GET/PUT/DELETE /api/tours/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Tour from '@/models/Tour';
import { Types } from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tour ID' },
        { status: 400 }
      );
    }

    const tour = await Tour.findById(params.id).populate(
      'guideId',
      'firstName lastName email phone profileImage averageRating'
    );

    if (!tour) {
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: tour },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch tour' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tour ID' },
        { status: 400 }
      );
    }

    const data = await request.json();

    const tour = await Tour.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!tour) {
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: tour },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update tour' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid tour ID' },
        { status: 400 }
      );
    }

    const tour = await Tour.findByIdAndDelete(params.id);

    if (!tour) {
      return NextResponse.json(
        { success: false, error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Tour deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting tour:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete tour' },
      { status: 500 }
    );
  }
}
