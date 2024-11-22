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

export const fetchMealFoods = async (mealId) => {
    try {
      // Make a GET request to the backend API using the meal ID
      const response = await axiosInstance.get(`/diets/meals/${mealId}/`);
      console.log(response.data) 
      return response.data; // Return the foods data from the API response
    } catch (error) {
      console.error(`Error fetching meal foods for meal ID: ${mealId}`, error);
      throw error; // Throw error to handle it in the calling component
    }
  };