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
    players: []
  }
}

export default (state=initialState, action) => {
  switch (action.type) {
    case "START":
      return {...state, playing: 1};
    case "JOIN":
      return {...state, voting: 0, currentGame: {...action.lobby, players: action.lobby.current_players.map((player) => {return {username:player}})}};
    case "LISTLOBBIES":
      return {...state, lobbies: action.lobbies};
    case "VOTE":
      return {...state, voting: 0};
    case "UPDATEGAMESTATUS":
      let game = {...action.game, players: action.game.player_list, id: state.currentGame.id}
      return {...state, voting: action.game.voting, currentGame: game};
    case "UPDATELOBBYSTATUS":
      if (action.lobby.id){
        return {...state, currentGame: {...action.lobby, players: action.lobby.current_players.map((player) => {return {username:player}})}};
      }
      return state
    case "LEAVE":
      return {...state, playing: 0, currentGame: {id: -1}};
    default:
      return state;
  }
}
