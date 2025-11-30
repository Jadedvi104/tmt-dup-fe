import React from 'react';
import { Category } from '@/app/types';
import { CategoryChip } from './CategoryChip';

interface BrowseCategoryProps {
  categories: Category[];
}

/**
 * Browse By Category Section Component
 */
export const BrowseCategory: React.FC<BrowseCategoryProps> = ({ categories }) => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold text-gray-800 mb-4">Browse by Category</h2>
    <p className="text-gray-600 mb-8 max-w-2xl">
      Not sure where to start? Discover popular experiences by theme.
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
      {categories.map((category, index) => (
        <CategoryChip key={index} category={category} />
      ))}
    </div>
  </section>
);
