import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, Grid, CardContent, Typography } from '@material-ui/core';
import { Card as MaterialCard } from '@material-ui/core';
import Card from './../Card/Card.js';
import Deck from './../Deck/Deck.js';
import PropTypes from 'prop-types';
import { phoenixRed, deathEaterViolet, lightPhoenixRed, lightDeathEaterViolet, darkDeathEaterViolet  } from '@/Styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  cardList:  {
    display: 'flex',
    flexDirection: 'row',
    padding:"10px",
    "border-radius": "5px",
    "text-align": "center"
  }
}));
function Board({currentGame}){
  const classes = useStyles();
  let proclamacionesFenix = []
  let proclamacionesMortifagas = []
  if(currentGame.score){
    proclamacionesFenix = new Array(currentGame.score.good).fill(1)
    proclamacionesMortifagas = new Array(currentGame.score.bad).fill(1)
  }
  const voidMortifagas = Array(6-proclamacionesMortifagas.length).fill();
  const voidFenix = Array(5-proclamacionesFenix.length).fill();
  let spells = new Array(6).fill("NocardDE")
  if(currentGame.player_list.length<7) {
    spells = ["NocardDE", "NocardDE", "Adivination", "AvadaKedavra", "AvadaKedavraExp", "NocardDEEND"]
  }
  else {
    if (currentGame.player_list.length<9){
      spells = ["NocardDE", "Crucio", "Adivination", "AvadaKedavra", "AvadaKedavraExp", "NocardDEEND"]
    }
    else{
      spells = ["Crucio", "Crucio", "Adivination", "AvadaKedavra", "AvadaKedavraExp", "NocardDEEND"]
    }
  }
  return <div>
      <Grid container className={classes.root, classes.cardList} spacing={1}
            style={{backgroundColor: lightDeathEaterViolet, border: "5px solid "+deathEaterViolet}}>
        {proclamacionesMortifagas.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index}>
            <Card type={"Mortifaga"} portrait={true} key={index}/>
          </Grid>
        ))}
        {voidMortifagas.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index} style={index+currentGame.score.bad>=3 ?
                                                        {backgroundColor: darkDeathEaterViolet, "border-radius": "1px"} : undefined}>
            <Card type={spells[index+currentGame.score.bad]} portrait={true} key={index}/>
          </Grid>
        ))}
      </Grid>
      <br/>
      <Grid container className={classes.root, classes.cardList} spacing={1}
            style={{backgroundColor: lightPhoenixRed, border: "5px solid "+phoenixRed}}>
        {proclamacionesFenix.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index}>
            <Card type={"Fenix"} portrait={true} key={index}/>
          </Grid>
        ))}
        {voidFenix.map((proclamacion, index) => (
          <Grid xs={2} sm={2} md={2} key={index}>
            <Card type={"NocardFe"} portrait={true} key={index}/>
          </Grid>
        ))}
        {Array(currentGame.semaphore).fill(1).map((proclamacion, index) => (
          <Grid xs={4} sm={4} md={4} key={index}>
            <img key={index} src={"public/img/caos_dot_on.png"} style={{height:"10px"}}/>
          </Grid>
        ))}
        {Array(3-currentGame.semaphore).fill(1).map((proclamacion, index) => (
          <Grid xs={4} sm={4} md={4} key={index}>
            <img key={index} src={"public/img/caos_dot.png"} style={{height:"10px"}}/>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={4}>
        <Grid item key="deck"  xs={6} sm={6} md={6}>
          <MaterialCard className="">
            <CardContent className="">
              <Deck proclaimed={
                currentGame.score.good + currentGame.score.bad} />
            </CardContent>
          </MaterialCard>
        </Grid>
      </Grid>

  </div>
}


Board.propTypes = {
  currentGame: PropTypes.object.isRequired
}

export default Board;
