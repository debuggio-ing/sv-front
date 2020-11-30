import config from 'config';
import {
    authHeader,
    handleResponse
} from '@/_core';

export const gameService = {
    vote,
    gameStatus,
    getProcCards,
    postProcCards,
    nominateDirector,
    getSpell,
    postSpell,
    sendMessageService,
};

// Given 'Nox' or 'Lumos' and a gameId it sends a request to the API with the vote
function vote(chosen, gameId) {
    var vote = true;
    if (chosen == 'Nox') {
        vote = false;
    };
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            vote
        }),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + `/vote/`,
        requestOptions)
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
        requestOptions)
        .then(handleResponse)
        .then(game => {
            return game;
        });
}


// Returns the spell appropriate to the game's status
function getSpell(gameId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + '/spell/',
        requestOptions)
        .then(handleResponse)
        .then(spell_response=> {
            return spell_response;
        });
}


// Returns the spell appropriate to the game's status
function postSpell(gameId, target) {
    console.log("TARGET HECHIZO")
    console.log(target)
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({target})
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + '/spell/', requestOptions)
        .then(handleResponse)
        .then(response=> {
            console.log(response)
            return response;
        });
}


// Given a gameId it returns to the director the cards selected by the minsiter of the game
function getProcCards(gameId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + `/proc/`,
        requestOptions)
        .then(handleResponse)
        .then(procCards => {
            return procCards;
        })
}


// Given the cards to proclaim by the director, it returns true or false if the game is over or not
function postProcCards(gameId, election, expelliarmus=false) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({election,expelliarmus})
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + `/proc/`,
        requestOptions)
        .then(handleResponse)
        .then(procCards => {
            return procCards;
        })
}

// Sends a request to the nominate director.
function nominateDirector(gameId, candidateId) {
    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/games/` +
        gameId.toString() + '/director/' + candidateId.toString() + '/',
        requestOptions)
        .then(handleResponse)
        .then(nomination => {
            // for debugging purposes
            return nomination;
        });
}

// Sends a message.
function sendMessageService(gameId, message) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign(authHeader(), {
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({msg: message})
    };
    return fetch(`${config.apiUrl}/api/games/` +
        gameId.toString() + '/chat/send/',
        requestOptions)
        .then(handleResponse)
        .then(response => {
            // for debugging purposes
            console.log(response);
        });
}
