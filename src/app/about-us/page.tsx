'use client';

import React from 'react';
import Link from 'next/link';

/**
 * About Us Page Component
 * Showcases the company mission, vision, values, and team
 */
const AboutUsPage: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&h=300&fit=crop',
      bio: 'Passionate about authentic travel experiences and connecting travelers with local guides.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop',
      bio: 'Expert in tour logistics with 10+ years of experience in the travel industry.'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      role: 'Community Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop',
      bio: 'Dedicated to building meaningful connections between guides and travelers.'
    },
    {
      id: 4,
      name: 'David Park',
      role: 'Lead Developer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=300&fit=crop',
      bio: 'Tech innovator creating seamless platforms for travel experiences.'
    }
  ];

  const values = [
    {
      icon: '🌍',
      title: 'Authenticity',
      description: 'We connect travelers with genuine local experiences and passionate guides who know their destinations inside and out.'
    },
    {
      icon: '🤝',
      title: 'Community',
      description: 'Building strong relationships between travelers, guides, and local communities creates lasting connections and positive impact.'
    },
    {
      icon: '💚',
      title: 'Sustainability',
      description: 'We are committed to responsible tourism that benefits local economies and preserves cultural and natural heritage.'
    },
    {
      icon: '✨',
      title: 'Quality',
      description: 'Every tour is carefully curated and guided by experienced professionals to ensure memorable experiences.'
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
              <Link href="/" className="text-gray-600 hover:text-teal-600 font-medium transition-colors">
                Home
              </Link>
              <Link href="/about-us" className="text-teal-600 font-medium">
                About Us
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl sm:text-6xl font-bold mb-6">About TourMate</h1>
            <p className="text-xl text-teal-100 leading-relaxed">
              Connecting travelers with authentic local experiences through passionate guides and curated tours across Thailand.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Mission */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To create meaningful travel experiences that connect adventurous travelers with passionate local guides, enabling cultural exchange and supporting sustainable tourism across Thailand.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We believe that authentic travel experiences transform not only how people see the world, but also how they understand and respect different cultures.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                To become the leading platform for authentic local experiences in Southeast Asia, where every traveler discovers genuine connections and every guide finds meaningful opportunities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We envision a future where tourism empowers local communities, preserves cultural heritage, and creates economic opportunities for guides and their families.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-gray-100 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Our Core Values</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              These principles guide every decision we make and shape the experiences we provide.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value) => (
                <div key={value.title} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="text-5xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">Our Story</h2>
          <div className="prose prose-lg text-gray-700 max-w-3xl">
            <p className="mb-6">
              TourMate was founded in 2022 with a simple yet powerful idea: to bridge the gap between travelers seeking authentic experiences and passionate local guides eager to share their culture and knowledge.
            </p>
            <p className="mb-6">
              Our founders noticed that many travelers visited Thailand with a desire for genuine cultural experiences, yet struggled to find tours beyond the typical tourist routes. At the same time, talented local guides had limited platforms to reach international travelers.
            </p>
            <p className="mb-6">
              We created TourMate to solve this problem. By carefully vetting guides, curating unique experiences, and leveraging technology, we've built a platform where both travelers and guides thrive.
            </p>
            <p>
              Today, we're proud to have facilitated thousands of meaningful encounters across Thailand's most iconic and hidden destinations. Every tour on our platform is a story of connection, learning, and mutual respect.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-gray-50 py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">Meet Our Team</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              Passionate individuals dedicated to creating unforgettable travel experiences.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                    <p className="text-teal-600 font-semibold mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Ready to Discover Authentic Experiences?</h2>
            <p className="text-teal-100 mb-8 text-lg">
              Start your journey with TourMate today and create memories that will last a lifetime.
            </p>
            <Link
              href="/"
              className="inline-block px-8 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explore Tours
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} TourMate. All rights reserved. | Connecting travelers with authentic local experiences.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
