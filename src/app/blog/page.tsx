'use client';

import React, { useState } from 'react';
import Link from 'next/link';

/**
 * Blog Page Component
 * Displays travel blog posts with categories and featured content
 */
const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Posts' },
    { id: 'travel-tips', label: 'Travel Tips' },
    { id: 'destinations', label: 'Destinations' },
    { id: 'festivals', label: 'Festivals' },
    { id: 'culture', label: 'Culture & Local' },
    { id: 'food', label: 'Food & Dining' },
  ];

  const blogPosts = [
    {
      id: 1,
      title: 'Top 4 Floating Markets in Bangkok to Explore on Weekdays',
      excerpt: 'Discover the charm of Bangkok\'s floating markets without the weekend crowds. Experience authentic Thai culture and local cuisine at these hidden gems.',
      category: 'destinations',
      author: 'Jug',
      date: '1 year ago',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=400&fit=crop',
      readTime: '5 min read',
      commentCount: 1
    },
    {
      id: 2,
      title: '5 Best Places to Celebrate Songkran Festival in Bangkok',
      excerpt: 'The Thai New Year celebration is more than just water fights. Discover traditional and modern ways to celebrate Songkran in Bangkok.',
      category: 'festivals',
      author: 'Jug',
      date: '1 year ago',
      image: 'https://images.unsplash.com/photo-1533922622582-f3ee3ae8e5a4?w=600&h=400&fit=crop',
      readTime: '6 min read',
      commentCount: 3
    },
    {
      id: 3,
      title: '11 Things NOT to Do on Chinese New Year',
      excerpt: 'Learn about Chinese New Year superstitions and taboos to ensure good fortune and respect local traditions during this important celebration.',
      category: 'culture',
      author: 'Kate',
      date: '10 months ago',
      image: 'https://images.unsplash.com/photo-1514306688772-c3e29b92f8b5?w=600&h=400&fit=crop',
      readTime: '4 min read',
      commentCount: 0
    },
    {
      id: 4,
      title: 'Hidden Gems of Yaowarat Street: An Insight into Bangkok\'s Chinatown',
      excerpt: 'Explore the vibrant history and culture of Bangkok\'s Chinatown with insights into hidden gems, local businesses, and authentic experiences.',
      category: 'destinations',
      author: 'Mine',
      date: '1 year ago',
      image: 'https://images.unsplash.com/photo-1529923286425-ceb0c8972a36?w=600&h=400&fit=crop',
      readTime: '7 min read',
      commentCount: 0
    },
    {
      id: 5,
      title: '5 Incredible Benefits of Retreat Travel in Bangkok, Thailand',
      excerpt: 'Discover how retreat travel in Bangkok can help you recharge, reconnect with yourself, and experience the best wellness practices.',
      category: 'travel-tips',
      author: 'Mine',
      date: '1 year ago',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      readTime: '5 min read',
      commentCount: 0
    },
    {
      id: 6,
      title: '7 Art Therapy Benefits: Join Art Therapy Workshop Chinatown Bangkok',
      excerpt: 'Explore the therapeutic benefits of art therapy and join our unique workshop in Bangkok\'s Chinatown for mental and emotional well-being.',
      category: 'culture',
      author: 'Mine',
      date: '1 year ago',
      image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop',
      readTime: '6 min read',
      commentCount: 0
    },
    {
      id: 7,
      title: 'Explore Vibrant Yaowarat: Top 10 Things to Do in Bangkok Chinatown',
      excerpt: 'Uncover the top 10 must-do activities in Bangkok\'s vibrant Chinatown district, from street food to historical temples.',
      category: 'destinations',
      author: 'Mine',
      date: '1 year ago',
      image: 'https://images.unsplash.com/photo-1502394826501-6c7984dc1ae9?w=600&h=400&fit=crop',
      readTime: '8 min read',
      commentCount: 0
    },
    {
      id: 8,
      title: 'Local Street Food Guide: Authentic Thai Cuisine You Must Try',
      excerpt: 'Dive into the world of authentic Thai street food with our comprehensive guide to the best dishes, stalls, and local favorites.',
      category: 'food',
      author: 'Jug',
      date: '6 months ago',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop',
      readTime: '7 min read',
      commentCount: 2
    },
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPost = blogPosts[0];

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
              <Link href="/blog" className="text-teal-600 font-medium">
                Blog
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
          <h1 className="text-5xl sm:text-6xl font-bold mb-4">Travel Stories & Insights</h1>
          <p className="text-xl text-teal-100 max-w-2xl mx-auto">
            Discover travel tips, local culture, destination guides, and unforgettable stories from travelers and local experts around the world.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Featured Image */}
            <div className="h-64 lg:h-96 overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Featured Content */}
            <div className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <span className="px-4 py-1 bg-teal-100 text-teal-700 font-semibold text-sm rounded-full">
                  Featured
                </span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                {featuredPost.excerpt}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-gray-600 text-sm mb-6 pb-6 border-b border-gray-200">
                <span>By {featuredPost.author}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
                <span>•</span>
                <span>{featuredPost.readTime}</span>
              </div>

              {/* CTA */}
              <button className="inline-block px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition-colors w-fit">
                Read Full Story
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Browse by Category</h3>
        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === category.id
                  ? 'bg-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-teal-600 hover:text-teal-600'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </section>

      {/* Blog Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-bold text-gray-800 mb-8">
          {selectedCategory === 'all' ? 'Latest Articles' : categories.find(c => c.id === selectedCategory)?.label}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col"
            >
              {/* Post Image */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {categories.find(c => c.id === post.category)?.label}
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-xs text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  {/* CTA */}
                  <button className="w-full px-4 py-2 bg-teal-600 text-white font-semibold rounded-lg hover:bg-teal-700 transition-colors text-sm">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No articles found in this category yet.</p>
          </div>
        )}
      </section>

      {/* Newsletter CTA */}
      <section className="bg-linear-to-br from-teal-600 to-cyan-600 text-white py-16 px-4 my-12">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Stay Updated with Our Stories</h2>
          <p className="text-teal-100 mb-8 text-lg">
            Subscribe to our newsletter and get the latest travel tips, destination guides, and local insights delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-grow px-4 py-3 rounded-lg text-gray-800 font-medium focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="px-6 py-3 bg-white text-teal-600 font-bold rounded-lg hover:bg-gray-100 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">About TourMate</h4>
              <p className="text-gray-400 text-sm">
                Your trusted companion for discovering amazing travel experiences and local insights from around the world.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Categories</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                {categories.slice(1).map((cat) => (
                  <li key={cat.id} className="hover:text-white cursor-pointer transition-colors">
                    {cat.label}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                {['Facebook', 'Twitter', 'Instagram', 'Pinterest'].map((social) => (
                  <a key={social} href="#" className="text-gray-400 hover:text-white transition-colors">
                    {social}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} TourMate's Blog. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogPage;
