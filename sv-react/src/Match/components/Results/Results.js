import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { GridList,
         GridListTile,
         Typography
                        } from '@material-ui/core';
import Card from './../Card/Card.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));


function Results({currentGame}) {
    const classes = useStyles();
    let players = currentGame.players;
    let voting = currentGame.voting;
    let chaos = currentGame.semaphore != 0;

    return <GridList cellHeight={110} className={classes.root} cols={5}>
      {players.map((player, index) => (
        <GridListTile cols={1} key={index}>
          <div style={{display: 'flex'}}>
            <div style={{margin: 'auto'}}>
              <div style={{textAlign: 'center'}}>
                {player.username}
              </div>
              <div>
                {player.last_vote ? 
                          <Card type={"Lumos"} portrait={false}/> 
                          : <Card type={"Nox"} portrait={false}/> }
              </div>
            </div>
          </div>
        </GridListTile>
      ))}
    </GridList>
}

export default Results;
