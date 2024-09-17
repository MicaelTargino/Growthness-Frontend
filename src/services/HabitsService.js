import axiosInstance from '../utils/axiosInstance';

export const fetchHabitsStatus = async () => {
    try {
        const response = await axiosInstance.get('habits/habits/completion-status/');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('fetching user status error:', error);
        throw error;
    }
}