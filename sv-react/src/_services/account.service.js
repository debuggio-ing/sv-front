import config from 'config';
import {
    handleResponse,
    authHeader
} from '@/_helpers';

import {
    BehaviorSubject
} from 'rxjs';

const currentDataSubject = new BehaviorSubject(null);

export const accountService = {
    userInfo,
    currentData: currentDataSubject.asObservable(),
    logout,
    update,
    get currentDataValue () {
        return currentDataSubject.value
    }
}

// returns {username, email, id} when possible
function userInfo() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/users/info/`,
            requestOptions)
            .then(handleResponse)
            .then(x => {
                console.log(x)
                if (x != 'Token refreshed'){
                    currentDataSubject.next(x)
                    return x
                }
           });
}

function logout (){
    currentDataSubject.next(null)
}


// update username with new value and returns an UserPublic schema.
function update(username) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/api/users/info/modify/?username=` + username,
        requestOptions)
        .then(handleResponse)
        .then(userPublic => {
            currentDataSubject.next(userPublic)
            return userPublic;
        })
}