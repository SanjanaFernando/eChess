import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const createTournament = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}/tournaments/`, data);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating tournament', error);
        throw error;
    }
}