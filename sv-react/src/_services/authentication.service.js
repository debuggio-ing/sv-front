import { BehaviorSubject } from 'rxjs';

import config from 'config';
import { handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    register,
    login,
    logout,
    refreshToken,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function register(username, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({username, email, password })
    };

    return fetch(`${config.apiUrl}/api/register/`, requestOptions)
    // handle errors
    .then(handleResponse)
    .then(user => {
        console.log(user) // debugging purposes
    });
}
function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}

// Returns Object{access_token: <token for simple access>, refresh_token: <token for updating>}
function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/api/login/`, requestOptions)
        .then(handleResponse)
        .then(token => {
            // store jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(token));
            console.log(JSON.parse(localStorage.getItem('currentUser')));
            currentUserSubject.next(token);
            return token;
        });
}

function refreshToken(){
    const currentUser = authenticationService.currentUserValue;
     const requestOptions = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.refresh_token}` },
    };
    return fetch(`${config.apiUrl}/api/refresh/`, requestOptions)
        .then(handleResponse)
        .then(token => {
            // store jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(token));
            console.log(JSON.parse(localStorage.getItem('currentUser')));
            currentUserSubject.next(token);
            return;
        });
}