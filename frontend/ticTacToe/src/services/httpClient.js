import {removeToken} from "@/services/AuthProvider.js";

export {request, login, register, getUser, updateUser, getGames, createGame, joinGame, deleteGame, getGame, playGame};
const BASE_URL = 'http://localhost:3001';

const request = async (
    endpoint,
    method = 'GET',
    body = null,
    isAuthRequest = false,
) => {
    // Récupérer le token
    const token = localStorage.getItem('token');
    // Définir les en-têtes
    const headers = {
        'Content-Type': 'application/json',
        ...(!isAuthRequest && token && {
            Authorization: `Bearer ${token}`
        }),
    };
    // Configurer la requête
    const config = {
        method,
        headers,
        ...(body && {body: JSON.stringify(body)}),
    };
    try {
        // Envoyer la requête
        const response = await fetch(`${BASE_URL}${endpoint}`, config);
        if (response.status === 403 || response.status === 401) {
            // Token expired or invalid, remove token and redirect to login
            removeToken();
            window.location.href = '/login';
            return;
        }
        // Gérer la réponse
        if (!response.ok) {
            const errorBody = await response.json();
            throw new Error(errorBody.message || 'Something went wrong');
        }
        // Vérifier si la réponse a du contenu
        const contentType = response.headers.get('content-type');
        return contentType && contentType.includes('application/json')
            ? await response.json()
            : null;
    } catch (error) {
        // Gestion des erreurs
        console.error('API Error:', error);
        throw error;
    }
};

const login = (username, password) => {
    return request('/login', 'POST', {username, password}, true);
};
const register = (username, password) => {
    return request('/register', 'POST', {username, password}, true);
}

const getUser = (id) => {
    return request(`/user/${id}`);
}

const updateUser = (username, password) => {
    return request(`/user`, 'PUT', {username, password});
}

const getGames = () => {
    return request('/games');
}

const createGame = () => {
    return request('/games', 'POST');
}

const joinGame = (gameId) => {
    return request(`/games/${gameId}/join`, 'POST');
}

const deleteGame = (gameId) => {
    return request(`/games/${gameId}`, 'DELETE');
}

const getGame = (gameId) => {
    return request(`/games/${gameId}`);
}

const playGame = (gameId, row, col) => {
    return request(`/games/${gameId}/move/${row}/${col}`, 'POST');
}