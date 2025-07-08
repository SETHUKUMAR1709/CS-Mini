import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { LogIn } from 'lucide-react';

const HomePage = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <h1 className="text-5xl font-extrabold mb-6 text-center">Welcome to Our E-Commerce Store!</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Discover amazing products and enjoy a seamless shopping experience.
      </p>
      <Link to="/products" className="px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105">
        Shop Now!
      </Link>
    </div>
  );
};

export default HomePage;