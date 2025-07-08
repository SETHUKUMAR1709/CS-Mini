import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';    

const ProductCard = ({ product }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { theme } = useTheme();

  const handleLikeToggle = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className={`flex flex-col items-center p-4 m-2 rounded-lg shadow-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} transition-colors duration-300`}>
      <img
        src={product.imageUrl || `https://placehold.co/150x150/${theme === 'dark' ? '374151' : 'E5E7EB'}/${theme === 'dark' ? '9CA3AF' : '6B7280'}?text=${product.name.split(' ').slice(0, 2).join('+')}`}
        alt={product.name}
        className="w-36 h-36 object-cover rounded-md mb-4"
        onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/150x150/${theme === 'dark' ? '374151' : 'E5E7EB'}/${theme === 'dark' ? '9CA3AF' : '6B7280'}?text=No+Image`; }}
      />
      <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
      <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
      <button
        onClick={handleLikeToggle}
        className={`flex items-center px-4 py-2 rounded-full transition-all duration-300 ${isLiked ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'} ${theme === 'dark' && !isLiked ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : ''}`}
      >
        {isLiked ? <Heart fill="white" size={18} className="mr-2" /> : <Heart size={18} className="mr-2" />}
        {isLiked ? 'Liked' : 'Like'}
      </button>
    </div>
  );
};

export default ProductCard;
