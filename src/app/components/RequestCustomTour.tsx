'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Request Custom Tour Banner/CTA Component
 * Promotes custom tour customization and links to the customize page
 */
export const RequestCustomTour: React.FC = () => {
  return (
    <section className="bg-linear-to-br from-blue-600 to-teal-600 text-white py-16 px-4 rounded-2xl my-12">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">Can't Find Your Perfect Tour?</h2>
        <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
          Let us customize your dream trip! Tell us your preferences, budget, and special requirements, and our local experts will create a personalized tour just for you.
        </p>

        {/* Benefits List */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 text-left">
          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white bg-opacity-20">
                <span className="text-xl font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Personalized Itinerary</h3>
              <p className="text-blue-100 text-sm">Tailored specifically to your interests and preferences</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white bg-opacity-20">
                <span className="text-xl font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Local Expertise</h3>
              <p className="text-blue-100 text-sm">Matched with passionate local guides who know the area best</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="shrink-0">
              <div className="flex items-center justify-center h-10 w-10 rounded-md bg-white bg-opacity-20">
                <span className="text-xl font-bold">✓</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Best Value</h3>
              <p className="text-blue-100 text-sm">Competitive pricing that fits your budget</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href="/customize"
          className="inline-block px-10 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-gray-100 transition-colors shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          Request Your Custom Tour
        </Link>
      </div>
    </section>
  );
};
