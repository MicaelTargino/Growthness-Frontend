// src/utils/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/auth/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
