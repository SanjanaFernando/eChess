import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
}

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
        const response = await axios.post(`${API_URL}/auth/login`, data);
        // console.log("data: ", response.data);
        return response.data;
    } catch (error) {
        console.error('Error logging in', error);
        throw error;
    }
};

export const getPlayerByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/players/get-player-by-user/${userId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error retrieving organizer data...', error);
        throw error;
    }
}

export const playerTournaments = async (data) => {
    try {
        const userId = data.userId;
        const response = await axios.get(`${API_URL}/players/get-tournaments/${userId}`, {
            headers: getAuthHeader()
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error("Error fetching registered tournaments: ", err.error);
    }
}

export const getPlayersByPaymentStatus = async (tournamentId) => {
    try {
        console.log("Tournament Id from api call: ", tournamentId);
        const response = await axios.get(`${API_URL}/players/players-by-payments`, {
            params: { tournamentId },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching players by payment status: ', err);
        throw err;
    }
}

export const getPlayerTournamentRegistrations = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/players/get-player-tournament-registrations`, {
            params: { userId },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching tournament registrations:', error);
        throw error;
    }
};