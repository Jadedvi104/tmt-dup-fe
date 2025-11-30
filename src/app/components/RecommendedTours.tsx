import React from 'react';
import { Tour } from '@/app/types';
import { TourCard } from './TourCard';

interface RecommendedToursProps {
  tours: Tour[];
}

/**
 * Recommended Tours Section Component
 */
export const RecommendedTours: React.FC<RecommendedToursProps> = ({ tours }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Recommended Tours</h2>
    <p className="text-gray-600 mb-8 max-w-2xl">
      Explore our top-rated tours selected by our community of travelers. Find your perfect adventure.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {tours.map(tour => (
        <TourCard key={tour.id} tour={tour} />
      ))}
    </div>
  </section>
);
