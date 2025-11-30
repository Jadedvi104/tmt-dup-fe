/**
 * Booking Schema and Model
 * Stores booking information for tours
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  bookingReference: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  travelerId: mongoose.Types.ObjectId;
  travelerName: string;
  travelerEmail: string;
  travelerPhone: string;
  tourId: mongoose.Types.ObjectId;
  tourTitle: string;
  guideId: mongoose.Types.ObjectId;
  participants: {
    totalCount: number;
    adults: number;
    children: number;
    details?: Array<{
      name: string;
      age?: number;
      passportNumber?: string;
    }>;
  };
  startDate: Date;
  endDate?: Date;
  pricing: {
    basePrice: number;
    pricePerPerson: number;
    subtotal: number;
    discount?: {
      code?: string;
      amount?: number;
      percentage?: number;
    };
    tax?: number;
    totalPrice: number;
    currency: string;
  };
  payment: {
    method: string;
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    transactionId?: string;
    paidAt?: Date;
    amount: number;
    currency: string;
  };
  specialRequests?: string;
  preferences?: string[];
  hotelDetails?: {
    name: string;
    roomNumber?: string;
    address?: string;
  };
  cancellation?: {
    isCancelled: boolean;
    cancelledAt?: Date;
    reason?: string;
    refundAmount?: number;
    refundStatus?: string;
  };
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    bookingReference: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
    },
    travelerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    travelerName: String,
    travelerEmail: String,
    travelerPhone: String,
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    tourTitle: String,
    guideId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: {
      totalCount: { type: Number, required: true, min: 1 },
      adults: { type: Number, required: true },
      children: { type: Number, default: 0 },
      details: [
        {
          name: String,
          age: Number,
          passportNumber: String,
        },
      ],
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    pricing: {
      basePrice: { type: Number, required: true },
      pricePerPerson: { type: Number, required: true },
      subtotal: { type: Number, required: true },
      discount: {
        code: String,
        amount: Number,
        percentage: Number,
      },
      tax: Number,
      totalPrice: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
    },
    payment: {
      method: { type: String, required: true },
      status: {
        type: String,
        enum: ['pending', 'completed', 'failed', 'refunded'],
        default: 'pending',
      },
      transactionId: String,
      paidAt: Date,
      amount: { type: Number, required: true },
      currency: { type: String, default: 'USD' },
    },
    specialRequests: String,
    preferences: [String],
    hotelDetails: {
      name: String,
      roomNumber: String,
      address: String,
    },
    cancellation: {
      isCancelled: { type: Boolean, default: false },
      cancelledAt: Date,
      reason: String,
      refundAmount: Number,
      refundStatus: String,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Indexes
bookingSchema.index({ bookingReference: 1 });
bookingSchema.index({ travelerId: 1, createdAt: -1 });
bookingSchema.index({ tourId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ startDate: 1 });

const Booking = mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export default Booking;
