import React from 'react';
import { useRouter } from 'next/navigation';
import { Search } from '@/app/icons';
import { SearchInput } from './SearchInput';
import { Globe, Calendar, Users } from '@/app/icons';
import { thailandDestinations } from '@/app/constants/data';

interface HeroSectionProps {
  destination: string;
  onDestinationChange: (value: string) => void;
  onSearch: () => void;
}

/**
 * Hero Section with Search Form Component
 */
export const HeroSection: React.FC<HeroSectionProps> = ({
  destination,
  onDestinationChange,
  onSearch
}) => {
  const router = useRouter();

  const handleSearchWithRoute = () => {
    if (!destination.trim()) {
      alert('Please select a destination');
      return;
    }

    // Call the original search handler
    onSearch();

    // Navigate to dynamic destination page
    const destinationSlug = destination.toLowerCase().replace(/\s+/g, '-');
    router.push(`/to/${destinationSlug}`);
  };

  return (
    <div className="relative h-[600px] bg-linear-to-br from-teal-500 to-cyan-600 flex items-center justify-center p-4 overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover opacity-70"
        autoPlay
        muted
        loop
        aria-hidden="true"
      >
        <source src="https://videos.pexels.com/video-files/3045163/3045163-sd_640_360_30fps.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black opacity-40" />

      <div className="max-w-7xl mx-auto z-10 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-tight">
          Discover Authentic Local Experiences
        </h1>
        <p className="text-xl text-white opacity-90 mb-10">
          Hand-picked tours led by passionate local guides.
        </p>

        {/* Search Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 md:p-0 max-w-4xl mx-auto">
          {/* Search Inputs */}
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <SearchInput
              icon={Globe}
              label="Destination"
              value={destination}
              onChange={onDestinationChange}
              placeholder="Where are you going?"
              dropdown={true}
              options={thailandDestinations}
            />
            {/* Search Button */}
            <div className="flex items-center justify-center p-4 w-full md:w-auto">
              <button
                onClick={handleSearchWithRoute}
                className="flex items-center justify-center w-full md:w-auto px-8 py-3 text-lg font-bold bg-teal-600 text-white rounded-xl shadow-lg hover:bg-teal-700 transition-colors transform hover:scale-[1.02]"
              >
                <Search className="w-6 h-6 mr-3" />
                Search Tours
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
