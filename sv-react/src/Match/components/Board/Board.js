import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Grid } from '@material-ui/core';
import Card from './../Card/Card.js';
import PropTypes from 'prop-types';

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
  const voidMortifagas = Array(6-proclamacionesMortifagas.length).fill();
  const voidFenix = Array(5-proclamacionesFenix.length).fill();
  return <div>
      <Grid container className={classes.root, classes.cardList} spacing={1}>
        {proclamacionesMortifagas.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index}>
            <Card type={"Mortifaga"} portrait={true} key={index}/>
          </Grid>
        ))}
        {voidMortifagas.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index}>
            <Card type={"Void"} portrait={true} key={index}/>
          </Grid>
        ))}
      </Grid>
      <br/>
      <Grid container className={classes.root, classes.cardList} spacing={1}>
        {proclamacionesFenix.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index}>
            <Card type={"Fenix"} portrait={true} key={index}/>
          </Grid>
        ))}
        {voidFenix.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index}>
            <Card type={"Void"} portrait={true} key={index}/>
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
