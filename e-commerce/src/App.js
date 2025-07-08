import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your page components
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SellPage from './pages/SellPage';
import CheckoutPage from './pages/CheckoutPage'; // Assuming CheckoutPage is your Cart page
import ProfilePage from './pages/ProfilePage';

// Import contexts and components
import { ThemeProvider } from './contexts/ThemeContext'; // Import ThemeProvider
import { AuthProvider } from './contexts/AuthContext';   // Import AuthProvider
import ProtectedRoute from './components/ProtectedRoute'; // Your ProtectedRoute component
import NavBar from './components/NavBar'; // Optional: for unmatched routes

const App = () => {
  return (
    <Router>
     
      <ThemeProvider>
        <AuthProvider>
          {/* 2. NavBar should be rendered outside <Routes> if it's visible on all pages.
               It will correctly access ThemeContext and AuthContext now.
          */}
          <NavBar />

          {/* 3. Use only one <Routes> component to define all your routes.
          */}
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<SignupPage />} />

            
            <Route path="/sell" element={<ProtectedRoute><SellPage /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

           
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;