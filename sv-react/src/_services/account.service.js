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
                if (x != 'Token refreshed' && x != 'OK' && x != "Signature has expired"
                    && x != 'Internal Server Error' && x != 'Missing Authorization Header') {
                    currentDataSubject.next(x)
                    return x
                    }
           });
}

function logout (){
    currentDataSubject.next(null)
}


// update username with new value and returns an UserPublic schema.
function update(username = null, password = null) {
    var requestBody = {}
    if (username && !password){
        requestBody = JSON.stringify({username})
    }else if(!username && password){
        requestBody = JSON.stringify({password})
    }else if (username && password){
        requestBody = JSON.stringify({username, password})
    }
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {"Content-type":"application/json"}),
        body: requestBody
    };
    return fetch(`${config.apiUrl}/api/users/info/modify/`,
        requestOptions)
        .then(handleResponse)
        .then(x => {
            if (x != 'Conflict'){
                accountService.userInfo()
                return x;
            }
            else {
                return new Error()
            }
        })
}