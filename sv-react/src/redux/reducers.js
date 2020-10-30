import React from 'react';
import startGame from './actions.js'

import { lobbyService } from '@/_services';

const initialState = {
  playing: 0,
  proclamacionesFenix: 2,
  proclamacionesMortifagas: 4,
  voting: 0,
  lobbies: [
    {
      name: "Nombre",
      id: 1,
      current_players: [
          "Juancito",
          "Pepito"
      ],
      playing: 0
    }
  ],
  currentGame: {
    name: "default",
    id: 1,
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
      return {...state, currentGame: action.game};
    default:
      return state;
  }
}
