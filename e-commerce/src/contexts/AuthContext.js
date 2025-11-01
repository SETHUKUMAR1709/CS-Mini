import React, { createContext, useContext, useState, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // currentUser will store the logged-in user's info (e.g., { username, email })
    // Initialize from sessionStorage for persistence across tab refreshes (better than localStorage for auth tokens)
    const [currentUser, setCurrentUser] = useState(() => {
        const storedUser = sessionStorage.getItem('eCommerceCurrentUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Note: For a real app, you'd handle actual authentication tokens and user data securely.
    // For this local storage example, we'll store basic user objects.

    // Function to register a new user
    const register = useCallback(async (username, email, password) => {
        // In a real app, this would be an API call to your backend
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 500));

        const existingUsersString = localStorage.getItem('eCommerceUsers');
        let users = [];
        if (existingUsersString) {
            try {
                users = JSON.parse(existingUsersString);
            } catch (err) {
                console.error("Error parsing users from localStorage:", err);
                users = []; // Reset if corrupted
            }
        }

        // Check for duplicate email or username
        if (users.some(user => user.email === email)) {
            throw new Error('Email already registered.');
        }
        if (users.some(user => user.username === username)) {
            throw new Error('Username already taken.');
        }

        const newUser = { username, email, password }; // Store password directly for simplicity (NOT secure in real app!)
        users.push(newUser);
        localStorage.setItem('eCommerceUsers', JSON.stringify(users));

        // No automatic login after registration, user will be redirected to login page
        return true; // Indicate success
    }, []);

    // Function to log in a user
    const login = useCallback(async (email, password) => {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 500));

        const existingUsersString = localStorage.getItem('eCommerceUsers');
        let users = [];
        if (existingUsersString) {
            try {
                users = JSON.parse(existingUsersString);
            } catch (err) {
                console.error("Error parsing users from localStorage:", err);
                throw new Error('User data corrupted. Please try registering again.');
            }
        }

        const foundUser = users.find(user => user.email === email && user.password === password);

        if (foundUser) {
            // Set current user (excluding password for security in state)
            const userWithoutPassword = { username: foundUser.username, email: foundUser.email };
            setCurrentUser(userWithoutPassword);
            sessionStorage.setItem('eCommerceCurrentUser', JSON.stringify(userWithoutPassword));
            return userWithoutPassword; // Return user info
        } else {
            throw new Error('Invalid email or password.');
        }
    }, []);

    // Function to log out a user
    const logout = useCallback(() => {
        setCurrentUser(null);
        sessionStorage.removeItem('eCommerceCurrentUser');
        // Clear user-specific cart from localStorage on logout
        if (currentUser?.username) {
            localStorage.removeItem(`${currentUser.username}_cart`);
        }
    }, [currentUser]); // currentUser is a dependency because we use it to clear the specific cart

    // isAuthenticated derived from currentUser presence
    const isAuthenticated = !!currentUser;

    const value = {
        currentUser,
        isAuthenticated,
        register,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};