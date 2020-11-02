import config from 'config';
import {
    authHeader,
    handleResponse
} from '@/_helpers';

export const gameService = {
    vote,
    gameStatus,
    getDirProcCards,
    postDirProcCards,
    nominate_director,
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
        headers: Object.assign(authHeader(), {
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            vote
        }),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + `/vote/`, requestOptions)
        // handle errors
        .then(handleResponse)
        .then(response => {
            // for debugging purposes
            console.log(response);
            return response;
        });
}



// Given a gameId it returns GamePublic data
function gameStatus(gameId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + '/',
            requestOptions).then(handleResponse)
        .then(game => {
            return game;
        });
}


// Given a gameId it returns to the director the cards selected by the minsiter of the game
function getDirProcCards(gameId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + `/dir/proc/`, requestOptions).then(handleResponse).then(procCards => {
        return procCards;
    })
}


// Given the cards to proclaim by the director, it returns true or false if the game is over or not
function postDirProcCards(gameId, election) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify(election),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + `/dir/proc/`, requestOptions).then(handleResponse).then(procCards => {
        return procCards;
    })
}


// Sends a request to the nominate director.
function nominate_director(gameId, candidateId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() +'/director/' + candidateId.toString() + '/',requestOptions
                                ).then(handleResponse)
        .then(nomination => {
            // for debugging purposes
            console.log(nomination);
            return proclamation;
        });
}
