import axios from 'axios';

export const fetchCountries = async () => {
    try {
        const token = "1980|kt5sTvYNAm7xfvmOtJr5nMyA1P6WqM9T440hNflC";
        const response = await axios.get("https://restfulcountries.com/api/v1/countries", {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        // console.log(response.data);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching countries: ", error);
        throw error;
    }
}