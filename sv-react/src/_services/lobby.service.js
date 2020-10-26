import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const lobbyService = {
    listLobbies,
    joinLobby,
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


// Receives the id of a lobby the user wants to join. 
// If the lobby is full, it returns 409.
// If the lobby isn't full it adds the user to the lobby and returns the following data:
// lobby_id, lobby_name, current_players (usernames of the players in the lobby), max_players_allowed
function joinLobby(lobby_id) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/lobbies/` + lobby_id.toString() + `/join/`, requestOptions)
        .then(handleResponse)
        .then(lobby => {
            console.log(lobby)
            return lobby;
        });
}
