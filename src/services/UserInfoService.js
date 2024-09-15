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

export const fetchUserData = async () => {
    try {
      // empty patch request will only return the current user data
      const response = await axiosInstance.patch('/user/complete-profile/');
      return response.data;
    } catch(error) {
      console.log('Error getting user data: ', error);
      throw error;
    }
  }
  
  export const updateUserData = async (userData) => {    
      try {
        // empty patch request will only return the current user data
        const response = await axiosInstance.patch('/user/complete-profile/', userData);
        return 
        // return response.data;
      } catch(error) {
        console.log('Error updating user data: ', error);
        throw error;
      }
}