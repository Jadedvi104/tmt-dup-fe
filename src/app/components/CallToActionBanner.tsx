import React from 'react';

/**
 * Call to Action Banner Section Component
 */
export const CallToActionBanner: React.FC = () => (
  <section className="bg-teal-700 rounded-2xl p-8 md:p-12 text-white shadow-xl flex flex-col md:flex-row items-center justify-between">
    <div className="mb-6 md:mb-0">
      <h3 className="text-3xl font-bold mb-2">Become a Local Guide!</h3>
      <p className="text-teal-100 opacity-90">Share your passion and earn money showing visitors your city.</p>
    </div>
    <button className="px-8 py-3 bg-white text-teal-700 font-bold rounded-full shadow-lg hover:bg-gray-100 transition-colors">
      Join Our Community
    </button>
  </section>
);
