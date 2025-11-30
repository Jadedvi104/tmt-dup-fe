/**
 * Tour Schema and Model
 * Stores tour information created by local experts
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface ITour extends Document {
  title: string;
  description: string;
  shortDescription: string;
  slug: string;
  category: string;
  categories?: string[];
  tags?: string[];
  destination: {
    city: string;
    country: string;
    latitude?: number;
    longitude?: number;
    nearbyAttractions?: string[];
  };
  price: {
    amount: number;
    currency: string;
    perPerson: boolean;
  };
  duration: {
    value: number;
    unit: 'days' | 'hours';
  };
  maxParticipants?: number;
  minParticipants?: number;
  images: Array<{
    url: string;
    alt?: string;
    caption?: string;
    isMain?: boolean;
  }>;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    activities?: string[];
    meals?: string[];
  }>;
  includes?: string[];
  excludes?: string[];
  ageRequirement?: {
    minAge?: number;
    maxAge?: number;
    childFriendly: boolean;
  };
  physicalLevel?: 'easy' | 'moderate' | 'challenging';
  averageRating: number;
  totalReviews: number;
  guideId: mongoose.Types.ObjectId;
  guideName: string;
  guideImage?: string;
  isActive: boolean;
  isListed: boolean;
  createdAt: Date;
  updatedAt: Date;
  cancellationPolicy?: {
    freeUntilDays: number;
    refundPercentage: number;
  };
}

const tourSchema = new Schema<ITour>(
  {
    title: {
      type: String,
      required: [true, 'Tour title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Tour description is required'],
    },
    shortDescription: String,
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        'day-trips',
        'food-and-culture',
        'water-sports',
        'nature-trails',
        'cooking-classes',
        'photography',
      ],
    },
    categories: [String],
    tags: [String],
    destination: {
      city: { type: String, required: true },
      country: { type: String, required: true },
      latitude: Number,
      longitude: Number,
      nearbyAttractions: [String],
    },
    price: {
      amount: { type: Number, required: true, min: 0 },
      currency: { type: String, default: 'USD' },
      perPerson: { type: Boolean, default: true },
    },
    duration: {
      value: { type: Number, required: true, min: 1 },
      unit: { type: String, enum: ['days', 'hours'], default: 'days' },
    },
    maxParticipants: Number,
    minParticipants: Number,
    images: [
      {
        url: { type: String, required: true },
        alt: String,
        caption: String,
        isMain: Boolean,
      },
    ],
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
        activities: [String],
        meals: [String],
      },
    ],
    includes: [String],
    excludes: [String],
    ageRequirement: {
      minAge: Number,
      maxAge: Number,
      childFriendly: { type: Boolean, default: false },
    },
    physicalLevel: {
      type: String,
      enum: ['easy', 'moderate', 'challenging'],
      default: 'moderate',
    },
    averageRating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    guideId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    guideName: String,
    guideImage: String,
    isActive: {
      type: Boolean,
      default: true,
    },
    isListed: {
      type: Boolean,
      default: true,
    },
    cancellationPolicy: {
      freeUntilDays: { type: Number, default: 7 },
      refundPercentage: { type: Number, default: 100 },
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for performance
tourSchema.index({ title: 'text', description: 'text' }); // Full-text search
tourSchema.index({ category: 1 });
tourSchema.index({ 'destination.city': 1 });
tourSchema.index({ averageRating: -1 });
tourSchema.index({ createdAt: -1 });
tourSchema.index({ slug: 1 });
tourSchema.index({ guideId: 1 });

const Tour = mongoose.models.Tour || mongoose.model<ITour>('Tour', tourSchema);

export default Tour;
