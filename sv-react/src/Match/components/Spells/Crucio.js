import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, GridListTile } from '@material-ui/core';
import PropTypes from 'prop-types';
import Players from './../Players/Players.js'
import { gameService } from './../../../_services/game.service.js'
import Card from './../Card/Card.js'

const imgs_src = {
  'Order of the Phoenix': 'public/img/fenix_lealtad.png',
  'Death Eater': 'public/img/mortifago_lealtad.png'
}


function torturePlayer(gameId, playerId) {
  gameService.postSpell(gameId, playerId).then(response => {
  }).catch(err => {
    //console.log(err)
  })
}

function Crucio({ currentGame, role }) {
  return <Grid container justify="center" alignItems="center" xs={12} spacing={2}>
    {currentGame.in_crucio ?
      <Grid item xs={10} >
        <Grid container justify="center" alignItems="center">
          <img src={imgs_src[role]} style={{ height: "300px" }} />
        </Grid>
      </Grid>
      : <Players playing={1} currentGame={currentGame} castCrucio={(id) => torturePlayer(currentGame.id, id)} />}
  </Grid>
}


Crucio.propTypes = {
  currentGame: PropTypes.object.isRequired
}


export default Crucio;
