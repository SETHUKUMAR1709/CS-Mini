import React, { useState } from 'react';
import styles from './Signup.module.css'; // Import the CSS Module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link, Navigate } from 'react-router-dom'; // For linking to login page
import { useAuth } from '../contexts/AuthContext'; // Import the Auth context

const SignupPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {signup} = useAuth(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        

        // Basic client-side validation
        if (!username || !email || !password || !confirmPassword) {
            setError('Please fill in all fields.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);
        // Simulate an API call for registration
        try {
            console.log('Attempting to register with:', { username, email, password });
            signup({ username, email, password });
            Navigate('/home');
            // Navigate('/login'); // Redirect to login page after successful registration
        } catch (err) {
            setError('An error occurred during registration. Please try again.');
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupCard}>
                <h2 className={styles.title}>Create Account</h2>
                <p className={styles.subtitle}>Join us and start exploring!</p>

                <form onSubmit={handleSubmit} className={styles.signupForm}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="username" className={styles.label}>Username</label>
                        <input
                            type="text"
                            id="username"
                            className={styles.input}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email Address</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <div className={styles.passwordInputWrapper}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <span
                                className={styles.passwordToggle}
                                onClick={togglePasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="confirmPassword" className={styles.label}>Confirm Password</label>
                        <div className={styles.passwordInputWrapper}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                className={styles.input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="••••••••"
                                required
                            />
                            <span
                                className={styles.passwordToggle}
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                            </span>
                        </div>
                    </div>

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.signupButton}
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </form>

                <div className={styles.footerLinks}>
                    Already have an account? <Link to="/login" className={styles.link}>Login here</Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;