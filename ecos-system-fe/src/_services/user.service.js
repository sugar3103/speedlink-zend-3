import config from '../config';
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    verifyAuth,
    getAll
};

function login(username, password,remember_me) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password,remember_me })
    };
     
    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a user in the response
            if (user.token) {
                // store user details and basic auth credentials in local storage 
                // to keep user logged in between page refreshes                
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function verifyAuth() {
    if(authHeader()) {
        //Check Expre Token
        let user = JSON.parse(localStorage.getItem('user'));
        return user;
    } else {
        return false;
    }
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {

}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}