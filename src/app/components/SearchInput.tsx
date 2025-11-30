import React, { useState } from 'react';
import { ChevronDown } from '@/app/icons';

interface SearchInputProps {
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  dropdown?: boolean;
  options?: string[];
}

/**
 * Custom Input component for the hero search bar with optional dropdown
 */
export const SearchInput: React.FC<SearchInputProps> = ({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  dropdown = false,
  options = []
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  if (dropdown && options.length > 0) {
    return (
      <div className="flex flex-col p-4 w-full border-b border-gray-200 md:border-b-0 md:border-r last:border-r-0 last:border-b-0 relative">
        <label className="text-sm font-semibold text-gray-500 mb-1">{label}</label>
        <div className="flex items-center text-gray-800 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          <Icon className="w-5 h-5 text-teal-500 mr-2" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="grow focus:outline-none bg-transparent text-lg font-medium placeholder-gray-400 cursor-pointer"
            readOnly
          />
          <ChevronDown className={`w-4 h-4 text-gray-400 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
            {options.map((option) => (
              <div
                key={option}
                onClick={() => handleSelect(option)}
                className="px-4 py-2 hover:bg-teal-50 cursor-pointer text-gray-700 text-sm border-b border-gray-100 last:border-b-0"
              >
                {option}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 w-full border-b border-gray-200 md:border-b-0 md:border-r last:border-r-0 last:border-b-0">
      <label className="text-sm font-semibold text-gray-500 mb-1">{label}</label>
      <div className="flex items-center text-gray-800">
        <Icon className="w-5 h-5 text-teal-500 mr-2" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="grow focus:outline-none bg-transparent text-lg font-medium placeholder-gray-400"
        />
        {dropdown && <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />}
      </div>
    </div>
  );
};
