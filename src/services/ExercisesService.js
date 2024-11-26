import axiosInstance from "../utils/axiosInstance";

function removeEmptyValues(obj) {
    return Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== null && value !== "")
    );
  }
  

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


/**
 * Creates an exercise and links it to a routine.
 *
 * @param {Object} exerciseData - The exercise data to create.
 * @param {Number} routineId - The routine ID to link the exercise.
 * @returns {Object} The created RoutineExercise object.
 */
export async function createExercise(exerciseData, routineId) {
  try {

    // Step 1: Create the exercise
    const exerciseResponse = await axiosInstance.post("/exercises/exercises/", exerciseData);
    const exerciseId = exerciseResponse.data.id;

    // Step 2: Link the exercise to the routine
    const enhancedData = {
        routine: routineId,
        exercise: exerciseId,
        day_of_week: exerciseData.day_of_week,
        ...exerciseData, // Include any additional data relevant to the exercise
      }
    
    // Remove keys with null or "" values
    const cleanedData = removeEmptyValues(enhancedData);
    console.log(cleanedData);
    const routineExerciseResponse = await axiosInstance.post(
      "/exercises/routines-exercises/",
      cleanedData
    );

    return routineExerciseResponse.data;
  } catch (error) {
    console.error("Error creating exercise or linking to routine:", error);
    throw new Error("Failed to create exercise or link to routine.");
  }
}


export const fetchRoutineId = async () => {
    try {
        const response = await axiosInstance.get("/exercises/routines/get-id/", {
            headers: {
                Authorization: `Token ${localStorage.getItem("growthness_access_token")}`, // Replace with your auth mechanism
            },
        });
        return response.data.routine_id
    } catch (error) {
        console.error("Failed to fetch routine ID:", error);
    }
};