import config from 'config';
import {
    authHeader,
    handleResponse
} from '@/_helpers';

export const lobbyService = {
    listLobbies,
    joinLobby,
    startMatch,
    getLobby,
    createLobby,
};


// Given a name and max_players (str, int) it returns the data of the created lobby with the creator already in the game
function createLobby(name, max_players){
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(),
            {'Content-Type': 'application/json'}),
        body: JSON.stringify({name, max_players}),
    }
    return fetch(`${config.apiUrl}/api/lobbies/new/`, requestOptions)
        // handle errors
        .then(handleResponse)
        .then(lobby => {
            // for debugging purposes
            console.log(lobby);
            return lobby;
        })
}

// Given a lobby_id it returns its information or "No content" in case it doesn't exist
function getLobby(lobby_id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    }
    return fetch(`${config.apiUrl}/api/lobbies/` + lobby_id.toString() + `/`, requestOptions)
        // handle errors
        .then(handleResponse)
        .then(lobby => {
            return lobby;
        })
}



// Returns a list of objects() with the data of all the lobbies in the server
function listLobbies(available, started, finished, user_games, all_games) {

                                    console.log("servicio", available);
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(),
            {'Content-Type': 'application/json'}),
        body: JSON.stringify({available, started, finished, user_games, all_games}),
            
    };
    return fetch(`${config.apiUrl}/api/lobbies/`, requestOptions)
        // handle errors
        .then(handleResponse)
        .then(lobbies => {
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

// Receives the lobbyId the user wants to start and returns error or the gameId of the started match
function startMatch(lobbyId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };
    // This works if the backend wants to code properly, otherwise modify function to receive the number of current players
    return fetch(`${config.apiUrl}/api/lobbies/` + lobbyId.toString() + '/start/', requestOptions)
        .then(handleResponse)
        // DEBUG purposes
        .then(gameId => {
            console.log(gameId);
            return gameId;
        })
}
