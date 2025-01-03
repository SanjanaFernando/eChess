import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Register API Call
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data; // This could be a success message or the new user data
    } catch (error) {
        console.error('Error registering user:', error);
        throw error.response ? error.response.data : error.message;
    }
};

// Login API Call
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials, {
            withCredentials: true, // If using cookies for session management
        });
        const { token, ...userData } = response.data;

        // Save token to local storage (or other secure storage as needed)
        localStorage.setItem('token', token);

        return userData; // Return user data after successful login
    } catch (error) {
        console.error('Error logging in:', error);
        throw error.response ? error.response.data : error.message;
    }
};
