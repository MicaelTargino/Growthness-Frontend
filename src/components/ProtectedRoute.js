import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // If user is authenticated, render the children components
  return children;
};

export default ProtectedRoute;
