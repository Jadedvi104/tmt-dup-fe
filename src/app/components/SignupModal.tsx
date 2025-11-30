import React, { useState } from 'react';
import { showNotification } from '@/utils/notification';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SignupRole = 'traveler' | 'local-expert' | null;

/**
 * Signup Modal Component
 * Allows users to choose between Traveler or Local Expert roles
 */
export const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [selectedRole, setSelectedRole] = useState<SignupRole>(null);
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const [termsAccepted, setTermsAccepted] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select a role');
      showNotification('Please select a role', 'error');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      showNotification('Passwords do not match', 'error');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      showNotification('Password must be at least 6 characters', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const [firstName, ...lastNameParts] = fullName.trim().split(' ');
      const lastName = lastNameParts.join(' ') || '';

      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password,
          phone: '',
          role: selectedRole === 'traveler' ? 'traveler' : 'local-expert',
          location: {
            country: '',
            city: '',
            coordinates: {
              latitude: 0,
              longitude: 0,
            },
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }

      showNotification('Account created successfully! Please log in.', 'success');
      
      // Reset form and close modal
      setFullName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setSelectedRole(null);
      setTermsAccepted(false);
      setError('');
      onClose();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Signup failed. Please try again.';
      setError(errorMessage);
      showNotification(errorMessage, 'error');
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    if (!selectedRole) {
      console.error('Please select a role');
      return;
    }
    console.log(`Signup with ${provider} as ${selectedRole}`);
    // Reset and close
    setSelectedRole(null);
    setFullName('');
    setEmail('');
    onClose();
  };

  if (!isOpen) return null;

  // Role Selection View
  if (!selectedRole) {
    return (
      <>
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full">
            {/* Header */}
            <div className="sticky top-0 bg-linear-to-r from-teal-600 to-cyan-600 text-white px-6 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Join TourMate</h2>
              <button
                onClick={onClose}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-gray-600 text-center mb-8 text-lg">
                Choose how you'd like to join our community
              </p>

              {/* Role Selection Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Traveler Card */}
                <button
                  onClick={() => setSelectedRole('traveler')}
                  className="p-8 border-2 border-gray-200 rounded-xl hover:border-teal-600 hover:bg-teal-50 transition-all hover:shadow-lg cursor-pointer group"
                >
                  <div className="text-5xl mb-4 text-center">✈️</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">I'm a Traveler</h3>
                  <p className="text-gray-600 text-center mb-6">
                    Discover authentic tours and experiences led by local guides
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-teal-600 text-lg">✓</span>
                      <span>Browse curated tours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-600 text-lg">✓</span>
                      <span>Book experiences easily</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-teal-600 text-lg">✓</span>
                      <span>Connect with local guides</span>
                    </div>
                  </div>
                </button>

                {/* Local Expert Card */}
                <button
                  onClick={() => setSelectedRole('local-expert')}
                  className="p-8 border-2 border-gray-200 rounded-xl hover:border-cyan-600 hover:bg-cyan-50 transition-all hover:shadow-lg cursor-pointer group"
                >
                  <div className="text-5xl mb-4 text-center">🌟</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">I'm a Local Expert</h3>
                  <p className="text-gray-600 text-center mb-6">
                    Share your passion and earn money by leading authentic tours
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600 text-lg">✓</span>
                      <span>Create your own tours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600 text-lg">✓</span>
                      <span>Earn income flexibly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-600 text-lg">✓</span>
                      <span>Build your reputation</span>
                    </div>
                  </div>
                </button>
              </div>

              {/* Already Have Account */}
              <p className="text-center text-gray-600 text-sm mt-8">
                Already have an account?{' '}
                <button className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Signup Form View
  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-linear-to-r from-teal-600 to-cyan-600 text-white px-6 py-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Create Your Account</h2>
              <p className="text-teal-100 text-sm mt-1 capitalize">
                Signing up as a {selectedRole === 'traveler' ? 'Traveler' : 'Local Expert'}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedRole(null);
                onClose();
              }}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Social Signup Options */}
            <div className="space-y-3 mb-6">
              {/* Facebook Signup */}
              <button
                onClick={() => handleSocialSignup('Facebook')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 0C4.477 0 0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.129 20 14.99 20 10c0-5.523-4.477-10-10-10z" />
                </svg>
                Continue with Facebook
              </button>

              {/* Google Signup */}
              <button
                onClick={() => handleSocialSignup('Google')}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white text-gray-800 border-2 border-gray-300 rounded-lg hover:border-gray-400 hover:bg-gray-50 disabled:bg-gray-200 disabled:cursor-not-allowed transition-colors font-medium shadow-sm hover:shadow-md"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSignup} className="space-y-4">
              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm text-red-800">{error}</span>
                </div>
              )}

              {/* Full Name Input */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-colors"
                  disabled={isLoading}
                />
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M15.171 13.576l1.414 1.414A6.981 6.981 0 0017.732 10h-1.463a5.001 5.001 0 01-1.098 3.576zM9.026 9.026l-2.25 2.25a2.003 2.003 0 002.25-2.25z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-colors"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M15.171 13.576l1.414 1.414A6.981 6.981 0 0017.732 10h-1.463a5.001 5.001 0 01-1.098 3.576zM9.026 9.026l-2.25 2.25a2.003 2.003 0 002.25-2.25z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Terms & Conditions */}
              <label className="flex items-start gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-1 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  disabled={isLoading}
                />
                <span>
                  I agree to TourMate's{' '}
                  <button type="button" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                    Terms of Service
                  </button>
                  {' '}and{' '}
                  <button type="button" className="text-teal-600 hover:text-teal-700 font-medium transition-colors">
                    Privacy Policy
                  </button>
                </span>
              </label>

              {/* Signup Button */}
              <button
                type="submit"
                disabled={isLoading || !fullName || !email || !password || !confirmPassword || !termsAccepted}
                className="w-full px-4 py-3 bg-linear-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-lg hover:from-teal-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            {/* Back Button */}
            <button
              onClick={() => setSelectedRole(null)}
              disabled={isLoading}
              className="w-full mt-3 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              ← Back to Role Selection
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
