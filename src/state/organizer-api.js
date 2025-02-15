import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
}

export const getOrganizerByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/organizers/getOrganizer/${userId}`, {
            headers: getAuthHeader()
        });
        return response;
    } catch (error) {
        console.error('Error retrieving organizer data...', error);
        throw error;
    }
}