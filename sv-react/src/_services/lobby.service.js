import config from 'config';
import { authHeader,handleResponse } from '@/_helpers';

export const lobbyService = {
    listLobbies
};
// Returns a list of objects()
function listLobbies() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/lobbies/`, requestOptions)
    // handle errors
    .then(handleResponse)
    .then(lobbies => {
        // for debugging purposes
        console.log(lobbies);
        return lobbies;
    });
}

