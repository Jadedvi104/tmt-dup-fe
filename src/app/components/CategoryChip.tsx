import React from 'react';
import Link from 'next/link';
import { Category } from '@/app/types';

interface CategoryChipProps {
  category: Category;
}

/**
 * Category Chip component
 */
export const CategoryChip: React.FC<CategoryChipProps> = ({ category: { name, icon: Icon } }) => {
  const categorySlug = name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and');

  return (
    <Link href={`/category/${categorySlug}`}>
      <div className="flex flex-col items-center justify-center p-4 sm:p-6 bg-white border border-gray-100 rounded-xl shadow-md hover:shadow-lg hover:border-teal-200 transition-all duration-300 cursor-pointer w-full text-center group">
        <div className="p-3 mb-2 bg-teal-50 text-teal-600 rounded-full group-hover:bg-teal-100 transition-colors">
          <Icon className="w-8 h-8" />
        </div>
        <p className="font-semibold text-gray-700 text-sm group-hover:text-teal-600 transition-colors">{name}</p>
      </div>
    </Link>
  );
};
