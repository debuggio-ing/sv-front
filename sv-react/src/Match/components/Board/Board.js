import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Grid } from '@material-ui/core';
import Card from './Card.js'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  cardList:  {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  }
}));
function Board({proclamacionesMortifagas, proclamacionesFenix}){
  const classes = useStyles();
  const voidMortifagas = Array(5-proclamacionesMortifagas.length).fill();
  const voidFenix = Array(6-proclamacionesFenix.length).fill();
  return <div>
      <Grid container className={classes.root, classes.cardList} spacing="1">
        {proclamacionesMortifagas.map((proclamacion) => (
          <Grid xs="2" sm="2" md="2">
            <Card type={"Mortifaga"}/>
          </Grid>
        ))}
        {voidMortifagas.map((proclamacion) => (
          <Grid xs="2" sm="2" md="2">
            <Card type={"Void"}/>
          </Grid>
        ))}
      </Grid>
      <br/>
      <Grid container className={classes.root, classes.cardList} spacing="1">
        {proclamacionesFenix.map((proclamacion) => (
          <Grid xs="2" sm="2" md="2">
            <Card type={"Fenix"}/>
          </Grid>
        ))}
        {voidFenix.map((proclamacion) => (
          <Grid xs="2" sm="2" md="2">
            <Card type={"Void"}/>
          </Grid>
        ))}
      </Grid>
  </div>
}


Board.propTypes = {
  proclamacionesMortifagas: PropTypes.array.isRequired,
  proclamacionesFenix: PropTypes.array.isRequired
}

export default Board;
