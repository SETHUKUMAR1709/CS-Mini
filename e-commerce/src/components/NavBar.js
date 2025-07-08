import { Link, useNavigate } from 'react-router-dom';
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../contexts/AuthContext';
import './NavBar.css'; // Import your CSS file for styling

const NavBar = () => {
    const { theme, toggleTheme } = useTheme();
    const { isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); 
        navigate('/'); 
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">E-Commerce</Link>
                <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
                    <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
                </button>
            </div>
            <div className="navbar-links">
                <Link to="/home">Home</Link>
                {isAuthenticated && <Link to="/sell">Sell</Link>}
                {isAuthenticated && <Link to="/profile">Profile</Link>}

                {isAuthenticated ? (
                    <button onClick={handleLogout} className="navbar-link-button"> {/* Add a class for styling */}
                        Logout
                    </button>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    );
}

export default NavBar;