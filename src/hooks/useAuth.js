import { useState, useEffect } from 'react';
import { tokenDecode } from '../utils/token';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        // console.log("useAuth token: ", token);
        if (token) {
            const decodedToken = tokenDecode(token);
            // console.log("useAuth decoded token: ", decodedToken);
            setUser(decodedToken);
        }
        setLoading(false);
    }, []);

    // console.log("User from useAuth: ", user);
    return { user, loading };
};

export default useAuth;