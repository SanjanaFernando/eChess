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
        // console.log(response.data);
        return response.data;
    } catch (err) {
        console.error(`Error fetching tournaments: `, err.message);
        throw err;
    }
}

export const getTournament = async (tournamentId) => {
    try {
        const response = await axios.get(`${API_URL}/tournaments/${tournamentId}`);
        // console.log("Tournament Data from API: ", response.data);
        return response.data;
    } catch (err) {
        console.error(`Error fetching tournament ${tournamentId}: `, err);
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

/**
 * Registers a player for tournament
 * @param {string} tournamentId - The id of the tournament
 * @param {object} registrationData - The player registration details
 * @param {string} registrationData.userId - The user id of the player
 * @param {string} registrationData.fideId - The FIDE id of the chess player
 * @param {string} registrationData.name - The name with initials of the player
 * @param {string} registrationData.birthday - The birth date of the player
 * @param {string} registrationData.ageGroup - The age group of the player
 * @param {string} registrationData.address - The address of the player
 * @param {string} registrationData.country - The country of the player
 * @param {number} registrationData.paymentAmount - The payment amount
 * @param {string} registrationData.paymentMethod - The payment method
 * @param {string} registrationData.paymentStatus - The payment status
 * @returns {Promise<Object>} - The response from the API
 */
export const playerResitration = async (tournamentId, registrationData) => {
    console.log(registrationData);
    try {
        const response = await axios.post(`${API_URL}/tournaments/${tournamentId}/register`, registrationData);
        console.log(`Player registered successfully: `, response.data);
        return response.data;
    } catch (err) {
        console.error(`Error registering player: `, err.response?.data || err.message);
        throw err;
    }
}