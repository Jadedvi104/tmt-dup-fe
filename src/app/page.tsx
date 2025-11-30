'use client';

import React, { useState } from 'react';
import { Header, HeroSection, RecommendedTours, BrowseCategory, CallToActionBanner, RequestCustomTour, Testimonials, Footer } from '@/app/components';
import { featuredTours, categories, navLinks } from '@/app/constants/data';
import { showNotification } from '@/app/utils/notification';

/**
 * Main Home Page Component
 * Displays tour marketplace with search, featured tours, categories, and call-to-action
 */
const App: React.FC = () => {
  // State Management
  const [destination, setDestination] = useState<string>('Thailand');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Search Handler
  const handleSearch = () => {
    console.log(`Searching for: ${destination}`);
    showNotification(`Search initiated for ${destination}! (Check console for details)`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header navLinks={navLinks} isMenuOpen={isMenuOpen} onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} />

      <main>
        <HeroSection
          destination={destination}
          onDestinationChange={setDestination}
          onSearch={handleSearch}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <RecommendedTours tours={featuredTours} />
          <RequestCustomTour />
          <BrowseCategory categories={categories} />
          <Testimonials />
          <CallToActionBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;