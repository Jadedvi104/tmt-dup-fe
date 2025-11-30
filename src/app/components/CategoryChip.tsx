import React from 'react';
import { Category } from '@/app/types';

interface CategoryChipProps {
  category: Category;
}

/**
 * Category Chip component
 */
export const CategoryChip: React.FC<CategoryChipProps> = ({ category: { name, icon: Icon } }) => (
  <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer w-full text-center">
    <div className="p-3 mb-2 bg-teal-50 text-teal-600 rounded-full">
      <Icon className="w-8 h-8" />
    </div>
    <p className="font-semibold text-gray-700 text-sm">{name}</p>
  </div>
);
