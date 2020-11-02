import React from 'react';
import startGame from './actions.js'

import { lobbyService } from '@/_services';

const initialState = {
  playing: 0,
  proclamacionesFenix: 2,
  proclamacionesMortifagas: 4,
  voting: 0,
  lobbies: [],
  currentGame: {
    name: "default",
    id: -1,
    minister: -1,
    director: -1,
    current_players: []
  }
}

export default (state=initialState, action) => {
  switch (action.type) {
    case "START":
      return {...state, playing: 1};
    case "JOIN":
      return {...state, currentGame: action.lobby};
    case "LISTLOBBIES":
      return {...state, lobbies: action.lobbies};
    case "VOTE":
      return {...state, voting: 0};
    case "UPDATEGAMESTATUS":
      let players = action.game.player_list.map((player) => player.player_id);
      let director = action.game.director;
      let minister = action.game.minister;
      let game = {...state.currentGame, ...action.game, current_players : players,
         director: director, minister: minister}
      return {...state, voting: action.game.voting, currentGame: game};
    case "UPDATELOBBYSTATUS":
      return {...state, currentGame: action.lobby};
    case "LEAVE":
      return {...state, playing: 0, currentGame: {id: -1}};
    default:
      return state;
  }
}
