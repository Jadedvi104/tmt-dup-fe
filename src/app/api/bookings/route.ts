/**
 * Bookings API - GET all bookings with filters
 * GET /api/bookings
 */

import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const searchParams = request.nextUrl.searchParams;
    const travelerId = searchParams.get('travelerId');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const filter: any = {};

    if (travelerId) filter.travelerId = travelerId;
    if (status) filter.status = status;

    const skip = (page - 1) * limit;

    const bookings = await Booking.find(filter)
      .populate('travelerId', 'firstName lastName email')
      .populate('tourId', 'title destination')
      .populate('guideId', 'firstName lastName')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Booking.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: bookings,
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
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

/**
 * Bookings API - Create a new booking
 * POST /api/bookings
 */
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const data = await request.json();

    const required = ['travelerId', 'tourId', 'guideId', 'startDate', 'participants', 'pricing', 'payment'];
    for (const field of required) {
      if (!data[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate booking reference
    const bookingReference = `TMT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const booking = await Booking.create({
      ...data,
      bookingReference,
    });

    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
      { status: 500 }
    );
  }
}
