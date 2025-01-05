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

export const getTournaments = async () => {
    try {
        const response = await axios.get(`${API_URL}/tournaments`);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(`Error fetching tournaments: `, err.message);
        throw err;
    }
}

export const getClassifiedTournaments = async () => {
    try {
        const response = await axios.get(`${API_URL}/tournaments/classified-tournaments`);
        // console.log("classified-tournaments: (from client)", response.data);
        return response.data;
    } catch (err) {
        console.error(`Error fetching classified tournaments: `, err.message);
        throw err;
    }
}

export const getTournamentsByStatus = async (data) => {
    try {
        // console.log(data);
        const response = await axios.get(`${API_URL}/tournaments/tournament-by-status`, { params: { status: data.status, userId: data.userId } });
        // console.log("tournaments from api call: ", response.data);
        return response.data;
    } catch (err) {
        console.log("Error fetching tournaments by status: ", err.error);
        return [];
    }
}