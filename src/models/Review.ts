/**
 * Review Schema and Model
 * Stores reviews and ratings for tours and guides
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  tourId: mongoose.Types.ObjectId;
  guideId: mongoose.Types.ObjectId;
  bookingId?: mongoose.Types.ObjectId;
  reviewerId: mongoose.Types.ObjectId;
  reviewerName: string;
  reviewerImage?: string;
  title: string;
  comment: string;
  rating: number;
  detailedRatings?: {
    accuracy?: number;
    communication?: number;
    cleanliness?: number;
    location?: number;
    value?: number;
  };
  images?: string[];
  helpfulCount?: number;
  verified: boolean;
  guideResponse?: {
    text: string;
    respondedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    tourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
      required: true,
    },
    guideId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
    },
    reviewerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reviewerName: String,
    reviewerImage: String,
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    detailedRatings: {
      accuracy: { type: Number, min: 1, max: 5 },
      communication: { type: Number, min: 1, max: 5 },
      cleanliness: { type: Number, min: 1, max: 5 },
      location: { type: Number, min: 1, max: 5 },
      value: { type: Number, min: 1, max: 5 },
    },
    images: [String],
    helpfulCount: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    guideResponse: {
      text: String,
      respondedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
reviewSchema.index({ tourId: 1, createdAt: -1 });
reviewSchema.index({ guideId: 1 });
reviewSchema.index({ rating: 1 });

const Review = mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);

export default Review;
