//On import la bibliothèque jwt-decode pour décoder le token JWT
import { jwtDecode } from "jwt-decode";
const isAuthenticated = () => {
    return localStorage.getItem('token') !== null;
}

const removeToken = () => {
    localStorage.removeItem('token');
}

const setToken = (token) => {
    if (token) {
        localStorage.setItem('token', token);
    }
}

const getUserIdentity = () => {
    let token = localStorage.getItem('token');
    if (token) {
        return jwtDecode(token);
    }
}

export {isAuthenticated, removeToken, setToken, getUserIdentity};