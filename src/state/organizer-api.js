import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const getOrganizerByUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/organizers/getOrganizer/${userId}`);
        return response;
    } catch (error) {
        console.error('Error retrieving organizer data...', error);
        throw error;
    }
}