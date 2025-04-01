import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
}

export const createTournament = async (data) => {
    try {
        console.log(data);
        const response = await axios.post(`${API_URL}/tournaments/`, data, {
            headers: getAuthHeader()
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error creating tournament', error);
        throw error;
    }
}

export const deleteTournament = async (tournamentId) => {
    try {
        const response = await axios.delete(`${API_URL}/tournaments/${tournamentId}`, {
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting tournament: ', error);
        throw error;
    }
};

export const getTournaments = async () => {
    try {
        const response = await axios.get(`${API_URL}/tournaments`, {
            headers: getAuthHeader()
        });
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(`Error fetching tournaments: `, err.message);
        throw err;
    }
}

export const getTournament = async (tournamentId) => {
    try {
        const response = await axios.get(`${API_URL}/tournaments/${tournamentId}`, {
            headers: getAuthHeader()
        });
        // console.log("Tournament Data from API: ", response.data);
        return response.data;
    } catch (err) {
        console.error(`Error fetching tournament ${tournamentId}: `, err);
        throw err;
    }
}

export const getClassifiedTournaments = async () => {
    try {
        const response = await axios.get(`${API_URL}/tournaments/classified-tournaments`, {
            headers: getAuthHeader()
        });
        // console.log("classified-tournaments: (from client)", response.data);
        return response.data;
    } catch (err) {
        console.error(`Error fetching classified tournaments: `, err.message);
        throw err;
    }
}

// export const getTournamentsByStatus = async (data) => {
//     try {
//         // console.log(data);
//         const response = await axios.get(`${API_URL}/tournaments/tournament-by-status`, {
//             params: { status: data.status, userId: data.userId },
//             headers: getAuthHeader()
//         });
//         // console.log("tournaments from api call: ", response.data);
//         return response.data;
//     } catch (err) {
//         console.log("Error fetching tournaments by status: ", err.error);
//         return [];
//     }
// }

export const getTournamentsByStatus = async (data) => {
    try {
        const response = await axios.get(`${API_URL}/tournaments/tournament-by-status`, {
            params: {
                status: data.status,
                userId: data.userId,
            },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching tournaments by status: ", error);
        return [];
    }
}

export const playerResitration = async (tournamentId, registrationData) => {
    console.log(registrationData);
    try {
        const response = await axios.post(`${API_URL}/tournaments/${tournamentId}/register`, registrationData, {
            headers: getAuthHeader()
        });
        console.log(`Player registered successfully: `, response.data);
        return response.data;
    } catch (err) {
        console.error(`Error registering player: `, err.response?.data || err.message);
        throw err;
    }
}

export const revokePlayerRegistration = async (tournamentId, playerId) => {
    try {
        const response = await axios.delete(`${API_URL}/tournaments/remove-player-registration`, {
            params: {
                tournamentId: tournamentId,
                playerId: playerId,
            },
            headers: getAuthHeader()
        })
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(`Error removing player from registration: `, err);
        throw err;
    }
}

export const acceptPlayerRegistration = async (tournamentId, playerId) => {
    try {
        console.log("PlayerId: ", playerId);
        console.log("TournamentId: ", tournamentId);
        const response = await axios.put(`${API_URL}/tournaments/accept-player-registration`, null, {
            params: { tournamentId, playerId },
            headers: getAuthHeader()
        });
        return response.data;
    } catch (error) {
        console.error('Error accepting player registration: ', error);
        throw error;
    }
};

