import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const gameService = {
    vote,
    gameStatus,
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



// Given a gameId it returns GamePublic which consists of:
// GamePublic = {
// player_list : List [PlayerPublic] where PlayerPublic = {
//                                                          player_id : int, 
//                                                          alive : bool ,
//                                                          voted : bool,
//                                                          last_vote : bool, 
//                                                          username: str
//                                                      }
// minister : int
// prev_minister : int
// director: int
// prev_director: int
// semaphore: int
// score: Score where Score = {good: int, bad:int}
// end: Optional[bool]
// winners: Optional[bool]
// el siguiente probablemente se borre porque esta mal, no tener en cuenta ahora
// roleReveal: Optional[List[Role]] where Role ={}
// }

function gameStatus(gameId) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/api/games/` + gameId.toString() + '/',
        requestOptions).then(handleResponse)
        .then(game => {
            console.log(game);
            return game;
        });
}