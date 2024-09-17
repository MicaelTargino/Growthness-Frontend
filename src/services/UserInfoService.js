import { format } from 'date-fns';
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
      // Empty object to hold non-null values
      const cleanedData = {};
  
      // Format birth_date and add it to cleanedData if it exists
      if (userData.birth_date) {
        cleanedData['birth_date'] = format(userData?.birth_date, "yyyy-MM-dd");
      }
  
      // Add non-null fields to cleanedData
      cleanedData['weight'] = userData.weight !== "" ? userData.weight : null;
      cleanedData['height'] = userData.height !== "" ? userData.height : null;
      cleanedData['goal'] = userData.goal !== "" ? userData.goal : null;
  
      // Make patch request with cleanedData instead of userData
      const response = await axiosInstance.patch('/user/complete-profile/', cleanedData);
      
      return response.data;  // Assuming you want to return the response data
    } catch (error) {
      console.log('Error updating user data: ', error);
      throw error;
    }
  };
  