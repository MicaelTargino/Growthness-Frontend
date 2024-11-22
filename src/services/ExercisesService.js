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

export const getExerciseData = async (exerciseId) => {
    try {
        // Send a GET request to the backend with the day of the week as a query parameter
        const response = await axiosInstance.get(`exercises/routines-exercises/${exerciseId}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Fetching exercises error:', error);
        throw error;
    }
}


export const deleteExercise = async (exerciseId) => {
    try {
        // Send a GET request to the backend with the day of the week as a query parameter
        const response = await axiosInstance.delete(`exercises/routines-exercises/${exerciseId}`);
        // console.log(response.data)
        return response;
    } catch (error) {
        console.error('Deleting exercise error:', error);
        throw error;
    }
}



export const getExerciseLogsGraphData = async (exerciseId, dateStep, startDateRange) => {
    try {
        const response = await axiosInstance.get(`exercises/routines-exercises/${exerciseId}/exercise-graph-logs/?dateStep=${dateStep}&startDateRange=${startDateRange}`);
        const data = response.data 
        console.log(data)
        return data
    } catch (error) {
        console.error('get exercises graph logs error:', error);
        throw error;
    }
}

export const createExerciseLog = async (logData) => {
    try {
      const response = await axiosInstance.post('exercises/exercise-logs/', logData);
      return response.data;
    } catch (error) {
      console.error('Error creating exercise log:', error);
      throw error;
    }
  };

