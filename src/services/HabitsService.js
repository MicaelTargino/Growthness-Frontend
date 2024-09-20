import axiosInstance from '../utils/axiosInstance';

export const fetchHabitsStatus = async () => {
    try {
        const response = await axiosInstance.get('habits/habits/completion-status/');
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('fetching habits status error:', error);
        throw error;
    }
}
export const createHabit = async (formData) => {
    try {
        const response = await axiosInstance.post('habits/habits/', formData);
        if (response.status != 201) {
            throw new Error("Error")
        } else {
            return response.data;
        }
    } catch (error) {
        console.error('creating habit error:', error);
        throw error;
    }
}