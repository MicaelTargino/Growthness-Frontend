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
