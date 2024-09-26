import axiosInstance from "../utils/axiosInstance";

export const fetchExercises = async () => {
    try {
        // Send a GET request to the backend with the day of the week as a query parameter
        const response = await axiosInstance.get(`exercises/exercises-today/`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Fetching exercises error:', error);
        throw error;
    }
}