import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


export const registerPlayer = async (data) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, data);
        return response.data;
    } catch (error) {
        console.error('Error registering player', error);
        throw error;
    }
};


export const login = async (data) => {
    try {
        console.log(API_URL);
        const response = await axios.post(`${API_URL}/auth/authenticate`, data);
        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};