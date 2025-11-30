'use client';

import React from 'react';
import Link from 'next/link';

/**
 * Travel Products Page Component
 * Displays travel-related products and services
 */
const TravelProductsPage: React.FC = () => {
  const products = [
    {
      id: 1,
      title: 'Travel Insurance',
      description: 'Comprehensive travel insurance coverage for your peace of mind',
      image: 'https://images.unsplash.com/photo-1552520514-5fefe8c9ef14?w=500&h=300&fit=crop',
      price: 'From $15'
    },
    {
      id: 2,
      title: 'Luggage Assistance',
      description: 'Secure storage and luggage handling services',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=300&fit=crop',
      price: 'From $10'
    },
    {
      id: 3,
      title: 'Airport Transfers',
      description: 'Convenient and reliable airport transportation',
      image: 'https://images.unsplash.com/photo-1537996051806-82cb40b68cef?w=500&h=300&fit=crop',
      price: 'From $20'
    },
    {
      id: 4,
      title: 'Travel Guides',
      description: 'Digital and physical travel guides for all destinations',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500&h=300&fit=crop',
      price: 'From $5'
    },
    {
      id: 5,
      title: 'Photography Tours',
      description: 'Capture your best travel moments with professional guidance',
      image: 'https://images.unsplash.com/photo-1488365871519-e21cc028cb29?w=500&h=300&fit=crop',
      price: 'From $50'
    },
    {
      id: 6,
      title: 'Travel SIM Cards',
      description: 'Stay connected with local SIM card options',
      image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=500&h=300&fit=crop',
      price: 'From $8'
    }
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
              <Link href="/travel-products" className="text-teal-600 font-medium">
                Travel Products
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
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Travel Products & Services</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Enhance your travel experience with our curated selection of travel products and services tailored for modern travelers.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Our Popular Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>

              {/* Product Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{product.title}</h3>
                <p className="text-gray-600 mb-4 text-sm">{product.description}</p>

                {/* Price */}
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="text-lg font-bold text-teal-600">{product.price}</p>
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

      {/* Benefits Section */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Why Choose Our Products?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: '✓', title: 'Quality Assured', description: 'All products are vetted and tested' },
              { icon: '💯', title: 'Best Prices', description: 'Competitive pricing with special discounts' },
              { icon: '📞', title: '24/7 Support', description: 'Round-the-clock customer support' },
              { icon: '🔒', title: 'Secure Payment', description: 'Safe and secure payment options' }
            ].map((benefit, index) => (
              <div key={index} className="bg-white rounded-lg p-6 text-center shadow-md hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Need Help Planning Your Trip?</h2>
          <p className="text-teal-100 mb-8 text-lg">
            Browse all our travel products and services to plan the perfect journey.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Back to Tours
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

export default TravelProductsPage;
