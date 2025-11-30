/**
 * User Schema and Model
 * Stores information about travelers and local experts
 */

import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string; // Hashed
  role: 'traveler' | 'local-expert';
  profileImage?: string;
  bio?: string;
  location?: {
    country: string;
    city: string;
    latitude?: number;
    longitude?: number;
  };
  isVerified: boolean;
  isActive: boolean;
  expertise?: string[]; // For local experts
  yearsOfExperience?: number;
  languages?: string[];
  averageRating?: number;
  totalReviews?: number;
  preferences?: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    marketingEmails: boolean;
    currency: string;
  };
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false, // Don't return password by default
    },
    role: {
      type: String,
      enum: ['traveler', 'local-expert'],
      default: 'traveler',
      required: true,
    },
    profileImage: String,
    bio: String,
    location: {
      country: String,
      city: String,
      latitude: Number,
      longitude: Number,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expertise: [String], // For local experts
    yearsOfExperience: Number,
    languages: [String],
    averageRating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
    },
    totalReviews: {
      type: Number,
      default: 0,
    },
    preferences: {
      emailNotifications: { type: Boolean, default: true },
      smsNotifications: { type: Boolean, default: false },
      marketingEmails: { type: Boolean, default: true },
      currency: { type: String, default: 'USD' },
    },
    lastLogin: Date,
  },
  {
    timestamps: true,
  }
);

// Index for email lookups
userSchema.index({ email: 1 });
userSchema.index({ role: 1 });
userSchema.index({ createdAt: -1 });

// Check if model already exists before creating
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
