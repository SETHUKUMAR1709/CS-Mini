import React from 'react';
import { Search } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  const { theme } = useTheme();
  return (
    <div className="relative w-full max-w-md mx-auto mb-8">
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className={`w-full p-3 pl-10 rounded-lg border focus:outline-none focus:ring-2 ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500' : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-400'}`}
      />
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
    </div>
  );
};

export default SearchBar;