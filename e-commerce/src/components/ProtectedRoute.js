import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import  AuthContext, { useAuth }  from '../contexts/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    
    return isAuthenticated ? children : <Navigate to="/login" />;
    }

export default ProtectedRoute;