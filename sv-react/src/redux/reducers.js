import React from 'react';
import startGame from './actions.js'

import { lobbyService } from '@/_services';

const initialState = {
  playing: 0, //is client in /match
  proclamacionesFenix: 2,
  proclamacionesMortifagas: 4,
  spellType: "None",
  voting: 0,
  in_session: 0,
  expelliarmus: 0,
  listAvailable: true,
  listStarted: false,
  listFinished: false,
  listOwnGames: false,
  minister_proclaimed: 0,
  client_minister: 0,
  client_director: 0,
  proclams: [],
  cards: [],
  //head_list: 0,
  lobbies: [],
  currentGame: {
    name: "default",
    id: -1,
    minister: -1,
    director: -1,
    prev_minister: -1,
    prev_director: -1,
    players: [],
    semaphore: 0,
    owner: "",
    messages: []

  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "START":
      return { ...state, playing: 1 };
    case "JOIN":
      return { ...state, voting: 0, currentGame: { ...action.lobby, players: action.lobby.current_players.map((player) => { return { nickname: player } }) } };


    case "TOGGLEAVAILABLE": {
      if (!state.listAvailable) {
        return { ...state, listAvailable: true, listStarted: false, listFinished: false }
      }
      else {
        return { ...state, listAvailable: false }
      }
    }
    case "TOGGLESTARTED": {
      if (!state.listStarted) {
        return { ...state, listStarted: true, listAvailable: false }
      }
      else {
        return { ...state, listStarted: false, listFinished: false, listAvailable: true }
      }
    }
    case "TOGGLEFINISHED": {
      if (!state.listFinished) {
        return { ...state, listFinished: true, listStarted: true, listAvailable: false }
      }
      else {
        return { ...state, listFinished: false }
      }
    }
    case "TOGGLEOWNGAMES":
      return { ...state, listOwnGames: !state.listOwnGames }
    case "LISTLOBBIES":
      return { ...state, lobbies: action.lobbies };
    case "VOTE":
      return { ...state, voting: 0 };
    case "LIST_PROCLAIM":
      return { ...state, proclams: action.proclams };
    case "AVADAKEDAVRA":
      return { ...state, spellType: "AvadaKedavra" };
    case "IMPERIO":
      return { ...state, spellType: "Imperio" };
    case "CRUCIO":
      return { ...state, spellType: "Crucio" };
    case "LIST_CARDS":
      return { ...state, cards: action.cards, spellType: "Divination" };
    case "UPDATEGAMESTATUS":
      if (action.game.player_list) {
        let game = { ...action.game, players: action.game.player_list, id: state.currentGame.id }
        return { ...state, voting: action.game.voting, currentGame: game };
      }
      return state
    case "UPDATELOBBYSTATUS":
      if (action.lobby.id) {
        return { ...state, currentGame: { ...action.lobby, players: action.lobby.current_players.map((player) => { return { nickname: player } }) } };
      }
      return state
    case "LEAVE":
      return { ...state, playing: 0, currentGame: { id: -1 } };
    default:
      return state;
  }
}
