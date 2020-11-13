import React from 'react';
import startGame from './actions.js'

import { lobbyService } from '@/_services';

const initialState = {
  playing: 0, //is client in /match
  proclamacionesFenix: 2,
  proclamacionesMortifagas: 4,
  spell: 0,
  voting: 0,
  in_session: 0,
  listAvailable: 1,
  listStarted: 0,
  listFinished: 0,
  listOwnGames: 0,
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
    players: []
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case "START":
      return { ...state, playing: 1 };
    case "JOIN":
      return { ...state, voting: 0, currentGame: { ...action.lobby, players: action.lobby.current_players.map((player) => { return { username: player } }) } };


    case "TOGGLEAVAILABLE": {
      if (state.listAvailable == 0) {
        return { ...state, listAvailable: 1, listStarted: 0, listFinished: 0 }
      }
      else {
        return { ...state, listAvailable: 0 }
      }
    }
    case "TOGGLESTARTED": {
      if (state.listStarted == 0) {
        return { ...state, listStarted: 1, listAvailable: 0 }
      }
      else {
        return { ...state, listStarted: 0, listFinished: 0, listAvailable: 1 }
      }
    }
    case "TOGGLEFINISHED": {
      if (state.listFinished == 0) {
        return { ...state, listFinished: 1, listStarted: 1, listAvailable: 0 }
      }
      else {
        return { ...state, listFinished: 0 }
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
      return {...state, spell: "AvadaKedavra" };
    case "LIST_CARDS":
      return {...state, cards: action.cards, spell: "Divination" };
    case "UPDATEGAMESTATUS":
      if (action.game.player_list) {
        let game = { ...action.game, players: action.game.player_list, id: state.currentGame.id }
        return { ...state, voting: action.game.voting, currentGame: game };
      }
      return state
    case "UPDATELOBBYSTATUS":
      if (action.lobby.id) {
        return { ...state, currentGame: { ...action.lobby, players: action.lobby.current_players.map((player) => { return { username: player } }) } };
      }
      return state
    case "LEAVE":
      return { ...state, playing: 0, currentGame: { id: -1 } };
    default:
      return state;
  }
}
