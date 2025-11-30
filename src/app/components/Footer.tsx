import React from 'react';

/**
 * Footer Component
 */
export const Footer: React.FC = () => (
  <footer className="bg-gray-800 text-white py-12 mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold text-lg mb-4 text-teal-300">Company</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 text-teal-300">Support</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Help Center</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 text-teal-300">Destinations</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Bangkok</li>
            <li>Chiang Mai</li>
            <li>Phuket</li>
          </ul>
        </div>
        <div className="col-span-2 md:col-span-1">
          <h4 className="font-semibold text-lg mb-4 text-teal-300">Follow Us</h4>
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-500">f</div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-500">t</div>
            <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center cursor-pointer hover:bg-teal-500">i</div>
          </div>
        </div>
      </div>
      <div className="mt-10 pt-6 border-t border-gray-700 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} TourMate. All rights reserved.
      </div>
    </div>
  </footer>
);
