import React from 'react';
import startGame from './actions.js'

import { lobbyService } from '@/_services';

const initialState = {
  playing: 0,
  proclamacionesFenix: 2,
  proclamacionesMortifagas: 4,
  voting: 0,
  in_session: 0,
  minister_proclaimed: 0,
  client_minister: 0,
  client_director: 0,
  //head_list: 0,
  lobbies: [],
  currentGame: {
    name: "default",
    id: -1,
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
    case "LIST_PROCLAIM":
      return {...state, proclams: action.proclams};
    case "UPDATEGAMESTATUS":
      let players = action.game.player_list.map((player) => player.username);
      let game = {...state.currentGame, ...action.game, current_players:players};
      return {...state, voting: action.game.voting, in_session: action.game.in_session,
        minister_proclaimed: action.game.in_session,
        client_minister: action.game.client_minister,
        client_director: action.game.client_director, currentGame: game};
    case "UPDATELOBBYSTATUS":
      return {...state, currentGame: action.lobby};
    case "LEAVE":
      return {...state, playing: 0, currentGame: {id: -1}};
    default:
      return state;
  }
}
