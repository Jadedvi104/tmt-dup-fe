"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DestinationPageProps {
  params: {
    destination: string;
  };
}

/**
 * Dynamic Destination Page Component
 * Displays tours and details for a selected destination
 */
const DestinationPage: React.FC<DestinationPageProps> = ({ params }) => {
  const router = useRouter();
  const { destination } = React.use<string>(params);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link
              href="/"
              className="text-3xl font-extrabold text-teal-600 cursor-pointer"
            >
              Tour<span className="text-gray-800">Mate</span>
            </Link>
            <button
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              ← Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Destination Header */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4 capitalize">
            Tours in {destination}
          </h1>
          <p className="text-gray-600 text-lg">
            Discover the best tours and experiences in {destination}
          </p>
        </div>

        {/* Placeholder Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-linear-to-br from-teal-400 to-cyan-500 h-48 flex items-center justify-center">
                <span className="text-white text-6xl font-bold opacity-30">
                  {i}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {destination} Tour {i}
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore the best experiences {destination} has to offer.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-teal-600">
                    ${Math.floor(Math.random() * 300) + 50}
                  </span>
                  <button className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            About {destination}
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Discover the best tours and experiences in {destination}. Our
            curated selection of tours showcases the authentic culture, stunning
            landscapes, and unique attractions that make {destination} a
            must-visit destination in Thailand.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Whether you're interested in cultural immersion, adventure
            activities, or relaxation, we have the perfect tour tailored to your
            interests and travel dates.
          </p>
        </div>
      </main>
    </div>
  );
};

export default DestinationPage;
