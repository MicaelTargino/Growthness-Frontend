import axiosInstance from '../utils/AxiosInstance';

// Register User
export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('register/', userData);
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

// Login User
export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post('token/', userData);
    localStorage.setItem('growthness_access_token', response.data.access);
    localStorage.setItem('growthness_refresh_token', response.data.refresh);
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
};
