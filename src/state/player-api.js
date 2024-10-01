import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, {
            email: email,
            password: password,
        });
        console.log(res.data);
        return res.data;
    } catch (err) {
        throw err;
    }
}