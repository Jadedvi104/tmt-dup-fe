/**
 * MongoDB Connection Configuration
 * Handles connection pooling and singleton pattern
 */

import mongoose, { Mongoose } from 'mongoose';
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/tourmate';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

// Cached connection for reuse
let cached: { conn: Mongoose | null; promise: Promise<Mongoose> | null } = {
  conn: null,
  promise: null,
};

async function connectToDatabase(): Promise<Mongoose> {
  // Return cached connection if available
  if (cached.conn) {
    return cached.conn;
  }

  // Return promise if connection is in progress
  if (cached.promise) {
    return cached.promise;
  }

  // Create new connection promise
  cached.promise = mongoose
    .connect(MONGODB_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      minPoolSize: 2,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    })
    .then((mongoose) => {
      console.log('✅ MongoDB Connected Successfully');
      return mongoose;
    })
    .catch((error) => {
      console.error('❌ MongoDB Connection Error:', error);
      throw error;
    });

  cached.conn = await cached.promise;
  return cached.conn;
}

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.warn('⚠️ Mongoose disconnected from MongoDB');
});

export default connectToDatabase;


