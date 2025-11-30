/**
 * CustomTourRequest Schema and Model
 * Stores custom tour requests from the customize page
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomTourRequest extends Document {
  requestReference: string;
  status: 'new' | 'responded' | 'accepted' | 'rejected' | 'completed';
  requesterId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  travelPeriod: string;
  flexibleDate: boolean;
  specificDate?: Date;
  destination: string;
  numberOfGuests: number;
  guestDetails?: Array<{
    name: string;
    age?: number;
    relationship?: string;
  }>;
  hotelDetails?: {
    name: string;
    roomNumber?: string;
    address?: string;
  };
  budgetPerDayPerPerson?: number;
  currency: string;
  totalBudgetEstimate?: number;
  budgetFlexibility?: string;
  interests: string[];
  specialPreferences: string[];
  additionalRequests?: string;
  notes?: string;
  assignedGuideId?: mongoose.Types.ObjectId;
  guideName?: string;
  guideResponse?: string;
  responseDate?: Date;
  convertedToTourId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const customTourRequestSchema = new Schema<ICustomTourRequest>(
  {
    requestReference: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'responded', 'accepted', 'rejected', 'completed'],
      default: 'new',
    },
    requesterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    travelPeriod: {
      type: String,
      required: true,
    },
    flexibleDate: {
      type: Boolean,
      default: true,
    },
    specificDate: Date,
    destination: {
      type: String,
      required: true,
    },
    numberOfGuests: {
      type: Number,
      required: true,
      min: 1,
    },
    guestDetails: [
      {
        name: String,
        age: Number,
        relationship: String,
      },
    ],
    hotelDetails: {
      name: String,
      roomNumber: String,
      address: String,
    },
    budgetPerDayPerPerson: Number,
    currency: {
      type: String,
      default: 'USD',
    },
    totalBudgetEstimate: Number,
    budgetFlexibility: {
      type: String,
      enum: ['fixed', 'flexible'],
      default: 'flexible',
    },
    interests: [String],
    specialPreferences: [String],
    additionalRequests: String,
    notes: String,
    assignedGuideId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    guideName: String,
    guideResponse: String,
    responseDate: Date,
    convertedToTourId: {
      type: Schema.Types.ObjectId,
      ref: 'Tour',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
customTourRequestSchema.index({ requestReference: 1 });
customTourRequestSchema.index({ email: 1 });
customTourRequestSchema.index({ destination: 1 });
customTourRequestSchema.index({ status: 1 });

const CustomTourRequest =
  mongoose.models.CustomTourRequest ||
  mongoose.model<ICustomTourRequest>('CustomTourRequest', customTourRequestSchema);

export default CustomTourRequest;
