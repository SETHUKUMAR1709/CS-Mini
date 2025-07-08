import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';


const LoginPage = () => {
  const { isAuthenticated, login, logout, loadingAuth, userId } = useAuth();
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'} transition-colors duration-300`}>
      <h1 className="text-4xl font-bold mb-8">Authentication</h1>
      {loadingAuth ? (
        <p className="text-lg">Loading authentication status...</p>
      ) : (
        <>
          {isAuthenticated ? (
            <div className="text-center">
              <p className="text-xl mb-4">You are logged in as: <span className="font-semibold">{userId}</span></p>
              <button
                onClick={logout}
                className="px-6 py-3 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition-colors duration-300 flex items-center mx-auto"
              >
                <LogOut className="mr-2" size={20} /> Logout
              </button>
              <Link to="/products" className="mt-4 inline-block text-blue-500 hover:underline">
                Go to Products
              </Link>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl mb-4">You are currently not logged in.</p>
              <button
                onClick={login}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 flex items-center mx-auto"
              >
                <LogIn className="mr-2" size={20} /> Login Anonymously
              </button>
              <p className="text-sm mt-4 text-gray-500">
                (This will log you in anonymously for demonstration purposes.)
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LoginPage;
