import {
    BehaviorSubject
} from 'rxjs';

import config from 'config';
import {
    handleResponse,
    authHeader
} from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    register,
    login,
    logout,
    userInfo,
    refreshToken,
    RefreshException,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() {
        return currentUserSubject.value
    }
};

function register(username, email, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            email,
            password
        })
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
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
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

function userInfo() {
    const requestOptions = {
        method: 'GET',
        headers: Object.assign(authHeader(),
            {'Content-Type': 'application/json'})
    };
    return fetch(`${config.apiUrl}/api/users/info/`,
            requestOptions)
            .then(userinfo => {
                console.log(userinfo)
                localStorage.setItem('userInfo', JSON.stringify(userInfo));
                console.log(JSON.parse(localStorage.getItem('userInfo')));
                return userinfo
            });
}

// Refresh Token, be careful with raising exceptions
function refreshToken() {
    const currentUser = authenticationService.currentUserValue;
    const refresh_token = currentUser.refresh_token
    const requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${currentUser.refresh_token}`
        },
    };

    return fetch(`${config.apiUrl}/api/refresh/`, requestOptions)
        .then(response => {
                if (!response.ok) {
                    if ([401, 403].indexOf(response.status) !== -1) {
                        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                        authenticationService.logout();
                    }
                    return Promise.reject("ERROR");
                };

                return response.text()
                        .then(text => {
                            const access_token = text && JSON.parse(text);
                            // store jwt token in local storage to keep user logged in between page refreshes
                            const tokens = (Object.assign(access_token, {"refresh_token":refresh_token}));
                            localStorage.setItem('currentUser', JSON.stringify(tokens));
                            currentUserSubject.next(tokens);
                            return;
                        })
        });
}

function RefreshException() {
  return new Error();
}

RefreshException.prototype = Object.create(Error.prototype);
