import axios from 'axios';
import axiosInstance from '../utils/axiosInstance';
import { format } from 'date-fns';

export const fetchHabitsStatus = async () => {
    try {
        const response = await axiosInstance.get('habits/habits/completion-status/');
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
export const createHabitLog = async (formData, habitId) => {
    try {
        const response = await axiosInstance.post('habits/habit-logs/', {
            habit: habitId,
            date: format(formData.dateRefered, 'yyyy-MM-dd'),
            amount: parseFloat(formData.goal)
        });
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

export const getHabitData = async (habitId) => {
    try {
        const response = await axiosInstance.get(`habits/habits/${habitId}/`);
        return response.data;
    } catch (error) {
        console.error('get habit error:', error);
        throw error;
    }
}

export const getHabitLogsData = async (habitId) => {
    try {
        const response = await axiosInstance.get(`habits/habit-logs/${habitId}/`);
        return response.data;
    } catch (error) {
        console.error('get habit error:', error);
        throw error;
    }
}

export const getHabitCompletionData = async (habitId) => {
    try {
        const data = await fetchHabitsStatus();
        for(let idx in data) {
            if (data[idx].id == habitId) return data[idx]
        }
    } catch (error) {
        console.error('get habit completion error:', error);
        throw error;
    }
}

export const getHabitLogsGraphData = async (habitId, dateStep, startDateRange) => {
    try {
        const response = await axiosInstance.get(`habits/habits/${habitId}/habit-graph-logs?dateStep=${dateStep}&startDateRange=${startDateRange}`);
        const data = response.data 
        console.log(data)
        const values = []
        for(let idx in data.logs) {
            console.log(data.logs[idx])
            values.push(data.logs[idx].amount)
        }
        return values
    } catch (error) {
        console.error('get habit graph logs error:', error);
        throw error;
    }
}

export const deleteHabit = async (habitId) => {
    try {
        const response = await axiosInstance.delete(`habits/habits/${habitId}/`);
        return response.data;
    } catch (error) {
        console.error('delete habit log error:', error);
        throw error;
    }
}
