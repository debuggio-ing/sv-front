import React from 'react';
import startGame from './actions.js'

const initialState = {
  playing: 0,
  proclamacionesFenix: 2,
  proclamacionesMortifagas: 4,
  matches: [
    {
      name: "Nombre",
      id: 1,
      players: [
        {
          nickname: "Juancito"
        },
        {
          nickname: "Pepito"
        }
      ],
      playing: 0
    },
    {
      name: "Nombre",
      id: 2,
      players: [
        {
          nickname: "Juancito"
        },
        {
          nickname: "Pepito"
        }
      ],
      playing: 0
    }
  ]
}

export default (state=initialState, action) => {
  switch (action.type) {
    case "START":
      return {...state, playing: 1};
    case "JOIN":
      return {...state, currentGame: action.id};
    default:
      return state;
  }
}
