import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List,
         ListItem,
         Typography
                        } from '@material-ui/core';
import Card from './../Card/Card.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  }
}));


function Results({currentGame}) {
    const classes = useStyles();
    let players = currentGame.players;
    let voting = currentGame.voting;
    let chaos = currentGame.semaphore != 0;

    return <List className={classes.root}>
      {chaos ? <Typography>El ministro no fue elegido</Typography> : <Typography>El ministro fue elegido</Typography>}
      {players.map((player, index) => (
        <ListItem>
          <ListItem>
            {player.username}
          </ListItem>
          <ListItem>
            {player.last_vote ? <Card type={"Lumos"} portrait={false}/> : <Card type={"Nox"} portrait={false}/> }
          </ListItem>
        </ListItem>
      ))}
    </List>
}

export default Results;
