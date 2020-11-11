import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import Card from './../Card/Card.js'

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

function Deck({proclaimed}) {
    let classes = useStyles();
    let discarded = 2*proclaimed;
    let cards_left = 17 - (2*proclaimed)%10 - proclaimed;
    return <Grid container className={classes.root, classes.cardList} container
    spacing={0}
    direction="column"
    alignItems="center"
    justify="center"
   >
        <Grid xs={6} sm={6} md={6}>
          <Typography align="center">Descarte</Typography>
          <div align="center">
            <Card type={"Pila-Descarte"} portrait={true} />
          </div>
            <Typography align="center" >{discarded}</Typography>
        </Grid>
        <Grid xs={6} sm={6} md={6}>
          <Typography align="center">Robo</Typography>
          <div align="center">
            <Card type={"Pila-Robo"} portrait={true}/>
          </div>
          <Typography align="center"> {cards_left}</Typography>
        </Grid>
      </Grid>
}


Deck.propTypes = {
  proclaimed: PropTypes.number.isRequired
}

export default Deck;
