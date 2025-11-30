/**
 * Custom Tour Requests API - GET all requests with filters
 * GET /api/custom-tour-requests
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import CustomTourRequest from '@/models/CustomTourRequest';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const destination = searchParams.get('destination');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filter: any = {};

    if (status) filter.status = status;
    if (destination) filter.destination = destination;

    const skip = (page - 1) * limit;

    const requests = await CustomTourRequest.find(filter)
      .populate('requesterId', 'firstName lastName email')
      .populate('assignedGuideId', 'firstName lastName email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await CustomTourRequest.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: requests,
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
    console.error('Error fetching custom tour requests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch requests' },
      { status: 500 }
    );
  }
}

/**
 * Custom Tour Requests API - Create a new request
 * POST /api/custom-tour-requests
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const data = await request.json();

    const required = ['name', 'email', 'phone', 'travelPeriod', 'destination', 'numberOfGuests', 'interests'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate request reference
    const requestReference = `CTR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const customRequest = await CustomTourRequest.create({
      ...data,
      requestReference,
      status: 'new',
    });

    return NextResponse.json(
      { success: true, data: customRequest },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating custom tour request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create request' },
      { status: 500 }
    );
  }
}
