import React from 'react';
import { Link } from 'react-router-dom';    
import { ShoppingCart, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';


const CheckoutPage = () => {
  const { theme } = useTheme();
  const { userId } = useAuth();
  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <ShoppingCart size={80} className="mb-6 text-green-500" />
      <h1 className="text-4xl font-bold mb-4 text-center">Welcome to the Checkout Page!</h1>
      <p className="text-xl text-center max-w-2xl">
        This page is protected and only accessible to logged-in users.
      </p>
      <p className="text-lg mt-4 text-center">User ID: <span className="font-semibold">{userId}</span></p>
      <Link to="/products" className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center">
        <Home className="mr-2" size={20} /> Continue Shopping
      </Link>
    </div>
  );
};

export default CheckoutPage;
