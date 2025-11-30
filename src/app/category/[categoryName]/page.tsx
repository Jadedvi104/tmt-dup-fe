'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { categories, categoryCities } from '@/app/constants/data';
import { Globe, Calendar, Users } from '@/app/icons';

/**
 * Category Page Component
 * Shows selected category and top 3 recommended cities
 */
const CategoryPage: React.FC = () => {
  const params = useParams();
  const categorySlug = params.categoryName as string;

  // Convert slug back to category name
  const categoryName = categorySlug
    .replace(/-/g, ' ')
    .replace(/\band\b/g, '&')
    .replace(/\b\w/g, l => l.toUpperCase());

  // Find the category object
  const category = categories.find(cat =>
    cat.name.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and') === categorySlug
  );

  // Get cities for this category
  const cities = categoryCities[categorySlug] || [];

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-8">The category you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-3xl font-extrabold text-teal-600 cursor-pointer">
              Tour<span className="text-gray-800">Mate</span>
            </Link>
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/deals" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
                Deals
              </Link>
              <Link href="/travel-products" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
                Travel Products
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="p-4 bg-white bg-opacity-20 rounded-full">
              <category.icon className="w-12 h-12" />
            </div>
            <div>
              <h1 className="text-5xl sm:text-6xl font-bold">{category.name}</h1>
              <p className="text-xl text-teal-100 mt-2">Discover the best destinations for your interests</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top Cities Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Top 3 Cities for {category.name}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Based on traveler preferences and expert recommendations, here are the best destinations
            to experience {category.name.toLowerCase()} in Thailand.
          </p>
        </div>

        {/* Cities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {cities.map((city, index) => (
            <div
              key={city.name}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* City Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4 bg-teal-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                  #{index + 1}
                </div>
              </div>

              {/* City Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">{city.name}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {city.description}
                </p>

                {/* CTA Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/to/${city.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex-1 px-4 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors text-center"
                  >
                    Explore Tours
                  </Link>
                  <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-teal-600 hover:text-teal-600 transition-colors">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Why These Cities Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Why These Cities for {category.name}?
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Expert Curated</h4>
              <p className="text-gray-600">
                Selected by our local experts based on authentic experiences and traveler feedback.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Highly Rated</h4>
              <p className="text-gray-600">
                These destinations consistently receive top ratings for {category.name.toLowerCase()} experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">Unique Experiences</h4>
              <p className="text-gray-600">
                Each city offers something special and authentic for your chosen category.
              </p>
            </div>
          </div>
        </div>

        {/* Back to Categories CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Explore Other Categories</h3>
          <p className="text-gray-600 mb-8">
            Not sure about {category.name}? Check out our other popular categories.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-700 transition-colors"
          >
            Browse All Categories
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} TourMate. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            Discover amazing experiences with our expert local guides.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CategoryPage;
