/**
 * Apply Promotion API - Apply a promo code to a booking
 * POST /api/promotions/apply
 */

import { NextRequest, NextResponse } from 'next/server';
import { Types } from 'mongoose';
import connectToDatabase from '@/lib/mongodb';
import Promotion from '@/models/Promotion';
import Booking from '@/models/Booking';

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const data = await request.json();
    const { code, bookingId } = data;

    // Validate input
    if (!code || !bookingId) {
      return NextResponse.json(
        { success: false, error: 'Missing code or bookingId' },
        { status: 400 }
      );
    }

    if (!Types.ObjectId.isValid(bookingId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking ID' },
        { status: 400 }
      );
    }

    // Get booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Get promotion by code
    const promotion = await Promotion.findOne({ code: code.toUpperCase() });
    if (!promotion) {
      return NextResponse.json(
        { success: false, error: 'Promotion code not found' },
        { status: 404 }
      );
    }

    // Check if promotion is active
    const now = new Date();
    if (!promotion.isActive || promotion.validFrom > now || promotion.validUntil < now) {
      return NextResponse.json(
        { success: false, error: 'Promotion code is not valid or has expired' },
        { status: 400 }
      );
    }

    // Check minimum purchase amount
    if (promotion.minPurchaseAmount && booking.pricing.subtotal < promotion.minPurchaseAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `Minimum purchase amount of ${promotion.minPurchaseAmount} ${promotion.currency} required`,
        },
        { status: 400 }
      );
    }

    // Check if user already used the promotion
    if (promotion.maxUsagePerUser) {
      const userUsageCount = promotion.usedBy.filter(
        (usage) => usage.userId.toString() === booking.travelerId.toString()
      ).length;

      if (userUsageCount >= promotion.maxUsagePerUser) {
        return NextResponse.json(
          { success: false, error: 'You have already used this promotion code' },
          { status: 400 }
        );
      }
    }

    // Check total usage limit
    if (promotion.totalUsageLimit && promotion.totalUsed >= promotion.totalUsageLimit) {
      return NextResponse.json(
        { success: false, error: 'Promotion code has reached its usage limit' },
        { status: 400 }
      );
    }

    // Calculate discount
    let discountAmount = 0;
    if (promotion.discount.type === 'percentage') {
      discountAmount = (booking.pricing.subtotal * promotion.discount.value) / 100;
    } else {
      discountAmount = promotion.discount.value;
    }

    // Apply max discount if specified
    if (promotion.maxDiscount && discountAmount > promotion.maxDiscount) {
      discountAmount = promotion.maxDiscount;
    }

    // Update booking with discount
    const newTotalPrice = booking.pricing.subtotal - discountAmount + (booking.pricing.tax || 0);

    booking.pricing.discount = {
      code: code.toUpperCase(),
      amount: discountAmount,
      percentage: promotion.discount.type === 'percentage' ? promotion.discount.value : 0,
    };
    booking.pricing.totalPrice = newTotalPrice;

    await booking.save();

    // Update promotion usage
    promotion.totalUsed += 1;
    promotion.usedBy.push({
      userId: booking.travelerId,
      usedAt: new Date(),
      bookingId: booking._id as Types.ObjectId,
    });

    await promotion.save();

    return NextResponse.json(
      {
        success: true,
        data: {
          message: 'Promotion applied successfully',
          discount: {
            amount: discountAmount,
            percentage: promotion.discount.type === 'percentage' ? promotion.discount.value : 0,
          },
          newTotalPrice,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error applying promotion:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to apply promotion' },
      { status: 500 }
    );
  }
}
