import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
};

export const uploadProfilePicture = async (userId, file) => {
    const formData = new FormData();
    formData.append('profilePicture', file);
    formData.append('userId', userId);

    // console.log(`Profile Picture Path: ${file.path} \nUser Id: ${userId}`);

    try {
        const response = await axios.post(`${API_URL}/images/profile-picture`, formData, {
            headers: {
                ...getAuthHeader(),
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading profile picture', error);
        throw error;
    }
};