import React from 'react';
import startGame from './actions.js'

const initialState = {
  playing: 0
}

export default (state=initialState, action) => {
  switch (action.type) {
    case "START":
      return {...state, playing: 1};
    default:
      return state;
  }
}
