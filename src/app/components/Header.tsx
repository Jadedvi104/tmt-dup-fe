import React, { useState } from 'react';
import Link from 'next/link';
import { Menu } from '@/app/icons';
import { LoginModal } from './LoginModal';
import { SignupModal } from './SignupModal';

interface HeaderProps {
  navLinks: string[];
  isMenuOpen: boolean;
  onMenuToggle: () => void;
}

/**
 * Header/Navigation Bar Component
 */
export const Header: React.FC<HeaderProps> = ({ navLinks, isMenuOpen, onMenuToggle }) => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState<boolean>(false);

  const getLinkHref = (link: string): string => {
    switch (link.toLowerCase()) {
      case 'deals':
        return '/deals';
      case 'travel products':
        return '/travel-products';
      case 'blog':
        return '/blog';
      case 'about us':
        return '/about-us';
      default:
        return '#';
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="text-3xl font-extrabold text-teal-600 cursor-pointer">
              Tour<span className="text-gray-800">Mate</span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={getLinkHref(link)}
                className="text-gray-600 hover:text-teal-600 text-base font-medium transition-colors"
              >
                {link}
              </Link>
            ))}
          </nav>

          {/* Desktop Auth/Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="text-gray-600 hover:text-teal-600 font-medium transition-colors"
            >
              Log In
            </button>
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="px-4 py-2 border border-teal-500 text-teal-500 rounded-full hover:bg-teal-50 transition-colors font-medium"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={onMenuToggle}
              className="p-2 text-gray-500 hover:text-teal-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link}
                href={getLinkHref(link)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600"
                onClick={() => onMenuToggle()}
              >
                {link}
              </Link>
            ))}
            <button
              onClick={() => setIsLoginModalOpen(true)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-teal-600 w-full text-left"
            >
              Log In
            </button>
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="block px-3 py-2 rounded-md text-base font-medium text-teal-600 bg-teal-50 mt-1 w-full text-left"
            >
              Sign Up
            </button>
          </div>
        </div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Signup Modal */}
      <SignupModal isOpen={isSignupModalOpen} onClose={() => setIsSignupModalOpen(false)} />
    </header>
  );
};
