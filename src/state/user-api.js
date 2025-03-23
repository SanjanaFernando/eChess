import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;


const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { Authorization: `Bearer ${token}` };
}

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
        // console.log(response.data);
        const { token, ...userData } = response.data;

        // Save token to local storage (or other secure storage as needed)
        // console.log(token);
        localStorage.setItem('token', token);

        return userData; // Return user data after successful login
    } catch (error) {
        console.error('Error logging in:', error);
        throw error.response ? error.response.data : error.message;
    }
};

export const getUser = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching user: ", err);
        throw err.response ? err.response.data : err.message;
    }
};

export const updateUser = async (userId, userData) => {
    try {
        console.log(userData);
        const response = await axios.put(`${API_URL}/api/v1/users/${userId}`, userData, {
            headers: getAuthHeader(),
        });
        return response.data;
    } catch (err) {
        console.error("Error updating user: ", err);
        throw err;
    }
}

export const sendPasswordResetEmail = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
        return response.data;
    } catch (err) {
        console.error("Error sending password reset email: ", err);
        throw err;
    }
};

export const resetPassword = async (token, password) => {
    try {
        const response = await axios.post(`${API_URL}/auth/reset-password/${token}`, { password });
        return response.data;
    } catch (err) {
        console.error("Error resetting password: ", err);
        throw err;
    }
}