import React from 'react';
import { Tour } from '@/app/types';
import { Calendar } from '@/app/icons';

interface TourCardProps {
  tour: Tour;
}

/**
 * Tour Card component for featured sections
 */
export const TourCard: React.FC<TourCardProps> = ({ tour }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
    <img
      src={tour.image}
      alt={tour.title}
      className="w-full h-48 object-cover"
      onError={(e) => (e.currentTarget.src = 'https://placehold.co/300x200/cccccc/333333?text=Tour+Image')}
    />
    <div className="p-4">
      <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{tour.title}</h3>
      <div className="flex justify-between items-center text-sm mb-2">
        <span className="text-gray-500 flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          {tour.duration}
        </span>
        <span className="text-yellow-500 font-semibold">{tour.rating} ★</span>
      </div>
      <div className="flex justify-between items-end mt-4">
        <span className="text-2xl font-extrabold text-teal-600">${tour.price}</span>
        <button className="px-4 py-2 text-sm font-semibold bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors shadow-md">
          View Details
        </button>
      </div>
    </div>
  </div>
);
