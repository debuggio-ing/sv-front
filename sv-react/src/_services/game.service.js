import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const gameService = {
    vote,
};

// Given 'Nox' or 'Lumos' and a gameId it sends a request to the API with the vote
function vote(chosen, gameId = 1) { //delete '= 1'
    var vote = true;
    if (chosen == 'Nox') {
        vote = false;
    };
    console.log(chosen);
    console.log(gameId);
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), 
                            { 'Content-Type': 'application/json' }),
        body: JSON.stringify({ vote }),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + `/vote/`, requestOptions)
        // handle errors
        .then(handleResponse)
        .then(lobbies => {
            // for debugging purposes
            console.log(lobbies);
            return lobbies;
        });
}