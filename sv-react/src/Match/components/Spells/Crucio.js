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

function torturePlayer(gameId, playerId){
  gameService.postSpell(gameId, playerId).then( response=> {
    console.log(response)
  }).catch(err => {
    console.log(err)
  })
}

function Crucio({currentGame}) {
  const styles = useStyles;
  return <Grid container xs={12} spacing={2}>
    <Players currentGame={currentGame} castCrucio={(id) => torturePlayer(currentGame.id, id)} />
  </Grid>
}

Crucio.propTypes = {
  currentGame: PropTypes.object.isRequired
}


export default Crucio;
