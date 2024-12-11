import { jwtDecode } from "jwt-decode";

export const tokenDecode = (token) => {
    return jwtDecode(token);
}