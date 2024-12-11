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
        let payload = token.split('.')[1];
        let decoded = atob(payload);
        return JSON.parse(decoded);
    }
}

export {isAuthenticated, removeToken, setToken, getUserIdentity};