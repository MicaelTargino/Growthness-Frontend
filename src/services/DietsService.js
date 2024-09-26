import axiosInstance from "../utils/axiosInstance";

export const fetchMeals = async () => {
    try {
        // Send a GET request to the backend with the day of the week as a query parameter
        const response = await axiosInstance.get(`diets/meals/`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Fetching diets error:', error);
        throw error;
    }
}