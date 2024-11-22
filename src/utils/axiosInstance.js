// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://growthnessapi.targino.dev/',
  // baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});


// Request interceptor for API calls
axiosInstance.interceptors.request.use(
    (config) => {
      // Retrieve the access token from localStorage
      const token = localStorage.getItem('growthness_access_token');
      if (token) {
        // Set the Authorization header with the Bearer token
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem('growthness_refresh_token');
          const response = await axiosInstance.post('auth/token/refresh/', { refresh: refreshToken });
          if(response.status === 401) { throw new Error('Token refresh failed') }
          const { access } = response.data;
  
          // Store the new token
          localStorage.setItem('growthness_access_token', access);
  
          // Update the Authorization header with the new access token
          axiosInstance.defaults.headers['Authorization'] = `Bearer ${access}`;
  
          // Retry the original request with the new access token
          return axiosInstance(originalRequest);
        } catch (err) {
          // Handle token refresh failure (e.g., redirect to login)
          console.error('Token refresh failed', err);
          localStorage.removeItem('growthness_access_token');
          localStorage.removeItem('growthness_refresh_token');
          window.location.href = '/login'; // Redirect to login page
        }
      }
  
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
