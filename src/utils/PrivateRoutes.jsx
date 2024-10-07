import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>; // Show a loading spinner while verifying the token
  }

  return user ? children : <Navigate to="/login" />; // If user is not authenticated, redirect to login
};

export default PrivateRoutes;
