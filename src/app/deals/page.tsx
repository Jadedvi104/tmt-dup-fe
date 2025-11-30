'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { specialDeals } from '@/app/constants/data';

type DealFilter = 'all' | 'tours' | 'tickets' | 'transportation' | 'others';

/**
 * Deals Page Component
 * Displays special promotions and discount codes
 */
const DealsPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<DealFilter>('all');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const filters: { value: DealFilter; label: string }[] = [
    { value: 'all', label: 'See All Our Deals' },
    { value: 'tours', label: 'Tours' },
    { value: 'tickets', label: 'Tickets' },
    { value: 'transportation', label: 'Transportation' },
    { value: 'others', label: 'Others' }
  ];

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
              <Link href="/deals" className="text-teal-600 font-medium">
                Deals
              </Link>
              <Link href="/" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
                Home
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Travel Deals to Grab Now</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Don't miss our special TourMate promo codes before checkout! Browse all of our latest and ongoing promotions right here, from special discounts to extra perks.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">What are you looking to book with TourMate?</h2>
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setSelectedFilter(filter.value)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                selectedFilter === filter.value
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-teal-600 hover:text-teal-600'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </section>

      {/* Deals Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {specialDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Deal Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                {/* Discount Badge */}
                <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold text-lg shadow-lg">
                  {deal.discount} OFF
                </div>
              </div>

              {/* Deal Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{deal.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{deal.description}</p>

                {/* Validity */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-sm text-gray-500">
                    <strong>Validity:</strong> {deal.validity}
                  </p>
                </div>

                {/* Promo Code */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-xs text-gray-500 mb-2">Use promo code:</p>
                  <div className="flex items-center justify-between gap-2">
                    <code className="text-lg font-bold text-teal-600 tracking-wider">{deal.code}</code>
                    <button
                      onClick={() => copyToClipboard(deal.code)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                        copiedCode === deal.code
                          ? 'bg-green-500 text-white'
                          : 'bg-teal-600 text-white hover:bg-teal-700'
                      }`}
                    >
                      {copiedCode === deal.code ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full px-4 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-md hover:shadow-lg">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-teal-100 mb-8 text-lg">
            Use any of these promo codes at checkout and start saving on your next tour experience!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Browse Tours
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} TourMate. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            For more information, visit our Help Center or contact our support team.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DealsPage;
