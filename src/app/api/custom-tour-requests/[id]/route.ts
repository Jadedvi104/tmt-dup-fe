/**
 * Custom Tour Requests API - GET, UPDATE, DELETE a specific request
 * GET/PUT/DELETE /api/custom-tour-requests/[id]
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CustomTourRequest from '@/models/CustomTourRequest';
import { Types } from 'mongoose';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase();

    if (!Types.ObjectId.isValid(params.id)) {
      return NextResponse.json(
        { success: false, error: 'Invalid request ID' },
        { status: 400 }
      );
    }

    const customRequest = await CustomTourRequest.findById(params.id)
      .populate('requesterId', 'firstName lastName email')
      .populate('assignedGuideId', 'firstName lastName email phone');

    if (!customRequest) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: customRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching custom tour request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch request' },
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
        { success: false, error: 'Invalid request ID' },
        { status: 400 }
      );
    }

    const data = await request.json();

    const customRequest = await CustomTourRequest.findByIdAndUpdate(
      params.id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!customRequest) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: customRequest },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating custom tour request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update request' },
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
        { success: false, error: 'Invalid request ID' },
        { status: 400 }
      );
    }

    const customRequest = await CustomTourRequest.findByIdAndDelete(params.id);

    if (!customRequest) {
      return NextResponse.json(
        { success: false, error: 'Request not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Request deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting custom tour request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete request' },
      { status: 500 }
    );
  }
}
