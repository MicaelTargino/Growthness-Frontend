import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';

export const IsAuthenticated = () => {
  return localStorage.getItem('growthness_access_token');
}

// Register User
export const registerUser = async (userData) => {
    const response = await axiosInstance.post('/auth/register/', userData);
    return response.data;
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/auth/token/', userData);
    localStorage.setItem('growthness_access_token', response.data.access);
    localStorage.setItem('growthness_refresh_token', response.data.refresh);
    axiosInstance.defaults.headers['Authorization'] = `Bearer ${ response.data.access }`;
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem('growthness_access_token');
  localStorage.removeItem('growthness_refresh_token');
  axiosInstance.defaults.headers['Authorization'] = '';
};

export const handleGoogleLogin = async (response) => {
  const token = response.credential;

  try {
      // Send the token to the backend
      const res = await axiosInstance.post('http://localhost:8000/auth/google/google-oauth2/', {
          access_token: token
      });

      // Store the access and refresh tokens for future requests
      localStorage.setItem('growthness_access_token', res.data.access);
      localStorage.setItem('growthness_refresh_token', res.data.refresh);

      return true;  // Return a success status to indicate the process finished

  } catch (error) {
      console.error("Login failed", error);
      throw error;  // Ensure the error is passed back for handling
  }
};
