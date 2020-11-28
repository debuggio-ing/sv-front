import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, GridListTile } from '@material-ui/core';
import PropTypes from 'prop-types';
import Players from './../Players/Players.js'
import {gameService} from './../../../_services/game.service.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function imposeMinister(gameId, playerId){
  console.log("LLamando a GAME SERVICE " + gameId + "  y playerId " + playerId)
  gameService.postSpell(gameId, playerId).then( response=> {
    console.log("TERMINADO EL SPELL")
  }).catch(err => {
    console.log(err)
  })
}

function Imperio({currentGame}) {
  const styles = useStyles;
  return <Grid container xs={12} spacing={2}>
    <Players currentGame={currentGame} castImperio={(id) => imposeMinister(currentGame.id, id)} />
  </Grid>
}

Imperio.propTypes = {
  currentGame: PropTypes.object.isRequired
}


export default Imperio;
