import React from 'react';
import startGame from './actions.js'

import { lobbyService } from '@/_services';

const initialState = {
  playing: 0, //is client in /match
  proclamacionesFenix: 2,
  proclamacionesMortifagas: 4,
  voting: 0,
  in_session: 0,
  listAvailable: true,
  listStarted: false,
  listFinished: false,
  listOwnGames: false,
  listAll: false,
  minister_proclaimed: 0,
  client_minister: 0,
  client_director: 0,
  proclams: [],
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

export default (state=initialState, action) => {
  switch (action.type) {
    case "START":
      return {...state, playing: 1};
    case "JOIN":
      return {...state, voting: 0, currentGame: {...action.lobby, players: action.lobby.current_players.map((player) => {return {username:player}})}};

      
      case "TOGGLEAVAILABLE":{
        if(state.listAvailable == false){
          return {...state, listAvailable: true, listStarted: false, listFinished: false, listAll: false}
        }
        else{
          return {...state, listAvailable: false}
        }
      }
      case "TOGGLESTARTED":{
        if(state.listStarted == false){
          return {...state, listStarted: true, listAvailable: false }
        }
        else{
          return {...state, listStarted: false, listFinished: false }
        }
      }
      case "TOGGLEFINISHED":{
        if(state.listFinished == false){
          return {...state, listFinished: true, listStarted: true, listAvailable: false }
        }
        else{
          return {...state, listFinished: false}
        }
      }
      case "TOGGLEOWNGAMES":{
        if(state.listOwnGames == false){
          return {...state, listOwnGames: true, listAll: false}
        }
        else{
          return {...state, listOwnGames: false}
        }
      }
        
      case "TOGGLEALLGAMES":{
        if(state.listAll == false){
          return {...state, listAll: true, listStarted: true, listFinished: true, listAvailable: false}
        }
        else{
          return {...state, listAll: false}
        }
      } 
    case "LISTLOBBIES":
      return {...state, lobbies: action.lobbies};
    case "VOTE":
      return {...state, voting: 0};
    case "LIST_PROCLAIM":
      return {...state, proclams: action.proclams};
    case "UPDATEGAMESTATUS":
      if(action.game.player_list){
        let game = {...action.game, players: action.game.player_list, id: state.currentGame.id}
        return {...state, voting: action.game.voting, currentGame: game};
      }
      return state
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
