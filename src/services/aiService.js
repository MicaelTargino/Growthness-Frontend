import axiosInstance from "../utils/axiosInstance";

export const sendDataToAI = async (formData) => {
    try {
        const response = await axiosInstance.post('ai/generate-data/', formData);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('fetch AI error:', error);
        throw error;
    }
}