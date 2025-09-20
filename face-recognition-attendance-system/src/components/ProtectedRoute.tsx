// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  console.log("user", user)
  if (!user || Object.keys(user).length === 0) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
