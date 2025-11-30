'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { showNotification } from '@/app/utils/notification';

/**
 * Customize Tour Page Component
 * Allows users to request a custom tour with detailed preferences
 */
const CustomizePage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    travelPeriod: '',
    flexibleDate: true,
    specificDate: '',
    hotelName: '',
    hotelRoom: '',
    destination: 'Bangkok',
    email: '',
    phone: '',
    guests: '2',
    budgetPerDay: '',
    interests: '',
    preferences: [] as string[],
    otherPreferences: ''
  });

  const destinations = ['Bangkok', 'Ayutthaya', 'Chiang Mai', 'Kanchanaburi', 'Pattaya', 'Phuket', 'Others'];
  
  const preferenceOptions = [
    'Private car',
    'Hotel Pickup',
    'Child friendly',
    'Vegetarian food',
    'Halal food',
    'Elder friendly',
    'Mobility impairments'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handlePreferenceToggle = (preference: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(preference)
        ? prev.preferences.filter(p => p !== preference)
        : [...prev.preferences, preference]
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.destination) {
      showNotification('Please fill in all required fields');
      return;
    }

    console.log('Custom Tour Request:', formData);
    showNotification('Your custom tour request has been submitted! We\'ll contact you soon.');
    
    // Reset form
    setFormData({
      name: '',
      travelPeriod: '',
      flexibleDate: true,
      specificDate: '',
      hotelName: '',
      hotelRoom: '',
      destination: 'Bangkok',
      email: '',
      phone: '',
      guests: '2',
      budgetPerDay: '',
      interests: '',
      preferences: [],
      otherPreferences: ''
    });
  };

  const budgetPerDay = formData.budgetPerDay ? parseInt(formData.budgetPerDay) : 0;
  const guests = parseInt(formData.guests) || 1;
  const travelDays = 3; // Default assumption
  const totalBudget = budgetPerDay * guests * travelDays;

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
              <Link href="/customize" className="text-teal-600 font-medium">
                Customize
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Customize Your Trip</h1>
          <p className="text-xl text-teal-100">
            Tell us your preferences, and our local experts will create a personalized tour just for you!
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Request Details</h2>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telephone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Travel Details */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Travel Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Travel Period <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="travelPeriod"
                    value={formData.travelPeriod}
                    onChange={handleInputChange}
                    placeholder="e.g., Dec 15 - Dec 22, 2025"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-3">
                    <input
                      type="checkbox"
                      name="flexibleDate"
                      checked={formData.flexibleDate}
                      onChange={handleInputChange}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-teal-500"
                    />
                    Flexible Date
                  </label>
                  {!formData.flexibleDate && (
                    <input
                      type="date"
                      name="specificDate"
                      value={formData.specificDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Destination <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="destination"
                    value={formData.destination}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {destinations.map(dest => (
                      <option key={dest} value={dest}>{dest}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    No. of Guests <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Hotel Information */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Hotel Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Hotel Name
                  </label>
                  <input
                    type="text"
                    name="hotelName"
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    placeholder="e.g., Mandarin Oriental Bangkok"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Hotel Room Number
                  </label>
                  <input
                    type="text"
                    name="hotelRoom"
                    value={formData.hotelRoom}
                    onChange={handleInputChange}
                    placeholder="e.g., 1205"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Budget Information */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Budget</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Budget per Day per Person <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-700">USD</span>
                    <input
                      type="number"
                      name="budgetPerDay"
                      value={formData.budgetPerDay}
                      onChange={handleInputChange}
                      placeholder="0"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Estimated Total Budget
                  </label>
                  <div className="flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-gray-50">
                    <span className="text-gray-700">USD</span>
                    <span className="text-lg font-bold text-teal-600">{totalBudget}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Based on {guests} guest(s) for 3 days</p>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">What are you looking for?</h3>
              <p className="text-sm text-gray-600 mb-4">Maximum 3 keywords, separated by comma or Enter</p>
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                placeholder="e.g., Temple Tour, Local Food, Photography"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>

            {/* Preferences */}
            <div className="border-b border-gray-200 pb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Other Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {preferenceOptions.map(pref => (
                  <label key={pref} className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:bg-teal-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.preferences.includes(pref)}
                      onChange={() => handlePreferenceToggle(pref)}
                      className="w-4 h-4 rounded border-gray-300 focus:ring-2 focus:ring-teal-500"
                    />
                    <span className="text-gray-700 font-medium">{pref}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Anything Else?
                </label>
                <textarea
                  name="otherPreferences"
                  value={formData.otherPreferences}
                  onChange={handleInputChange}
                  placeholder="Any additional requests or special requirements..."
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 px-6 py-4 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Submit Request
              </button>
              <Link
                href="/"
                className="px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:border-teal-600 hover:text-teal-600 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 mb-4">
            &copy; {new Date().getFullYear()} TourMate. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm">
            We'll review your request and contact you within 24 hours.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CustomizePage;
