/**
 * Promotions API - GET, UPDATE, DELETE specific promotion
 * GET /api/promotions/[id]
 * PUT /api/promotions/[id]
 * DELETE /api/promotions/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Promotion from '@/models/Promotion';

/**
 * GET - Retrieve a specific promotion by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid promotion ID' },
        { status: 400 }
      );
    }

    const promotion = await Promotion.findById(params.id);

    if (!promotion) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: promotion },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotion' },
      { status: 500 }
    );
  }
}

/**
 * PUT - Update a specific promotion
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid promotion ID' },
        { status: 400 }
      );
    }

    const data = await request.json();

    // Prevent direct modification of totalUsed
    if (data.totalUsed !== undefined) {
      delete data.totalUsed;
    }

    const promotion = await Promotion.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!promotion) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: promotion },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update promotion' },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Remove a specific promotion
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid promotion ID' },
        { status: 400 }
      );
    }

    const promotion = await Promotion.findByIdAndDelete(params.id);

    if (!promotion) {
      return NextResponse.json(
        { success: false, error: 'Promotion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: { message: 'Promotion deleted successfully' } },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete promotion' },
      { status: 500 }
    );
  }
}
