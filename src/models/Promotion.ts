/**
 * Promotion Schema and Model
 * Stores promotional codes and special deals
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IPromotion extends Document {
  title: string;
  description: string;
  code: string;
  discount: {
    type: 'percentage' | 'fixed';
    value: number;
    currency?: string;
  };
  validFrom: Date;
  validUntil: Date;
  isActive: boolean;
  minPurchaseAmount?: number;
  maxDiscount?: number;
  applicableCategories?: string[];
  applicableTours?: mongoose.Types.ObjectId[];
  maxUsagePerUser?: number;
  totalUsageLimit?: number;
  totalUsed: number;
  usedBy?: Array<{
    userId: mongoose.Types.ObjectId;
    usedAt: Date;
    bookingId: mongoose.Types.ObjectId;
  }>;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: mongoose.Types.ObjectId;
}

const promotionSchema = new Schema<IPromotion>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    code: {
      type: String,
      unique: true,
      required: true,
      uppercase: true,
    },
    discount: {
      type: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true,
      },
      value: {
        type: Number,
        required: true,
        min: 0,
      },
      currency: { type: String, default: 'USD' },
    },
    validFrom: {
      type: Date,
      required: true,
    },
    validUntil: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    minPurchaseAmount: Number,
    maxDiscount: Number,
    applicableCategories: [String],
    applicableTours: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Tour',
      },
    ],
    maxUsagePerUser: Number,
    totalUsageLimit: Number,
    totalUsed: {
      type: Number,
      default: 0,
    },
    usedBy: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
        usedAt: Date,
        bookingId: {
          type: Schema.Types.ObjectId,
          ref: 'Booking',
        },
      },
    ],
    image: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
promotionSchema.index({ code: 1 });
promotionSchema.index({ validFrom: 1, validUntil: 1 });
promotionSchema.index({ isActive: 1 });

const Promotion =
  mongoose.models.Promotion || mongoose.model<IPromotion>('Promotion', promotionSchema);

export default Promotion;
