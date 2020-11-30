import config from 'config';
import {
    handleResponse,
    authHeader,
} from '@/_helpers';
import 'regenerator-runtime/runtime'
import {
    authenticationService
} from './authentication.service'

import {
    BehaviorSubject
} from 'rxjs';

export const currentDataSubject = new BehaviorSubject(null);

export const accountService = {
    userInfo,
    currentData: currentDataSubject.asObservable(),
    logout,
    getPicture,
    uploadPicture,
    update,
    get currentDataValue() {
        return currentDataSubject.value
    },
}

// returns {nickname, email, id} when possible
function userInfo() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/users/info/`,
            requestOptions)
        .then(handleResponse)
        .then(x => {
            if (x != 'Token refreshed' && x != 'OK' && x != "Signature has expired" &&
                x != 'Internal Server Error' && x != 'Missing Authorization Header') {
                currentDataSubject.next(x)
                return x
            }
        });
}

function logout() {
    currentDataSubject.next(null)
}


// update nickname with new value and returns an UserPublic schema.
function update(nickname = null, password = null, oldpassword=null) {
    var requestBody = {}
    console.log(nickname,password, oldpassword)
    let currentUser = accountService.currentDataValue.nickname
    if ((nickname != currentUser) && !password) {
        requestBody = JSON.stringify({
            nickname
        })
    } else if (password) {
        requestBody = JSON.stringify({
            password,
            oldpassword
        })
    } 

    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {
            "Content-type": "application/json"
        }),
        body: requestBody
    };
    return fetch(`${config.apiUrl}/api/users/info/modify/`,
            requestOptions)
        .then(handleResponse)
        .then(x => {
            if (x != 'Conflict') {
                accountService.userInfo()
                return x;
            } else {
                console.log(x)
                return new Error()
            }
        })
}


async function getPicture(){
    const requestOptions = {
    method: 'GET',
    headers: authHeader(),
    };

    let response = await fetch(`${config.apiUrl}/api/users/picture/`,
        requestOptions)
    try {
        let blob = await response.blob()
        let image="public/img/harry-potter.png"
        if (blob.size){
            image = URL.createObjectURL(blob)
        }
        return image
    } catch (err){
        console.log('fetch failed', err)
    }
}

function uploadPicture(file){
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: file,
        redirect: 'follow'
      };

    return fetch(`${config.apiUrl}/api/users/picture/`, requestOptions)
        .then(handleResponse)
        .catch(error => console.log('error', error));
}
