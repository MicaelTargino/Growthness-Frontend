// just templortal
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { logoutUser } from '../services/authService';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser()
    navigate('/login')
  }, [navigate]);

  return <p>Logging out...</p>;
};

export default Logout;
