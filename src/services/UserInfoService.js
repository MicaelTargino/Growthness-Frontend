import axiosInstance from '../utils/axiosInstance';

export const fetchUserStatus = async () => {
    try {
      const response = await axiosInstance.get('/user/complete-profile/profile-status');
      return response.data 
    } catch (error) {
      console.error('fetching user status error:', error);
      throw error;
    }
  };