import React, { useState } from 'react';
import styles from './Login.module.css'; // Import the CSS Module
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link} from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the Auth context
import { useNavigate } from 'react-router-dom'; // For navigation after login

const LoginPage = () => {
    const navigate = useNavigate(); // Use useNavigate for programmatic navigation
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // For simulating API call
    const { login } = useAuth(); // Import the login function from your Auth context

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors

        if (!email || !password) {
            setError('Please enter both email and password.');
            return;
        }

        setLoading(true);
        // Simulate an API call
        try {
            // Replace with your actual authentication logic (e.g., fetch, axios)
            login({ email, password });
            navigate('/home'); // Redirect to home page after successful login
                // Redirect user or set global authentication state
            
        } catch (err) {
            setError('An error occurred during login. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <h2 className={styles.title}>Welcome Back!</h2>
                <p className={styles.subtitle}>Sign in to continue to your account.</p>

                <form onSubmit={handleSubmit} className={styles.loginForm}>
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

                    {error && <p className={styles.errorMessage}>{error}</p>}

                    <button
                        type="submit"
                        className={styles.loginButton}
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <div className={styles.footerLinks}>
                     Don't have an account?
                    <span> &bull; </span>
                    <Link to="/register" className={styles.link}>Sign Up</Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;