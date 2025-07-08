import React, { useEffect } from "react";
import { useContext, createContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
}


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) {
            setUser(storedUser);
            setIsAuthenticated(true);
        }
    }, []);


    const login = (userData) => {
        const { email, password } = userData;
        localStorage.setItem("user", JSON.stringify({ email, password }));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const signup = (userData) => {
        const { userName, email, password } = userData;
        localStorage.setItem("user", JSON.stringify({ userName, email, password }));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;