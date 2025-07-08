import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { LogIn, LogOut, ShoppingCart, Home } from 'lucide-react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import LoginPage from './pages/LoginPage';
import CheckoutPage from './pages/CheckoutPage';
import ThemeToggle from './components/ThemeToggle';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen font-inter">
            {/* Navbar */}
            <nav className="flex items-center justify-between p-4 bg-blue-600 text-white shadow-md">
              <div className="flex items-center space-x-4">
                <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors duration-200">E-Shop</Link>
                <Link to="/products" className="text-lg hover:text-blue-200 transition-colors duration-200">Products</Link>
                <Link to="/checkout" className="text-lg hover:text-blue-200 transition-colors duration-200">Checkout</Link>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <AuthStatusButton />
              </div>
            </nav>

            {/* Routes */}
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />
              {/* Fallback for unknown routes */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
};

const AuthStatusButton = () => {
  const { isAuthenticated, logout, loadingAuth } = useAuth();
  const { theme } = useTheme();

  if (loadingAuth) {
    return <span className="text-sm">Loading...</span>;
  }

  return isAuthenticated ? (
    <button
      onClick={logout}
      className={`px-3 py-1 rounded-full text-sm flex items-center ${theme === 'dark' ? 'bg-red-700 text-white hover:bg-red-600' : 'bg-red-500 text-white hover:bg-red-600'} transition-colors duration-300`}
    >
      <LogOut size={16} className="mr-1" /> Logout
    </button>
  ) : (
    <Link
      to="/login"
      className={`px-3 py-1 rounded-full text-sm flex items-center ${theme === 'dark' ? 'bg-green-700 text-white hover:bg-green-600' : 'bg-green-500 text-white hover:bg-green-600'} transition-colors duration-300`}
    >
      <LogIn size={16} className="mr-1" /> Login
    </Link>
  );
};

export default App;
