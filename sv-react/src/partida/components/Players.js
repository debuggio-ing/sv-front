import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  playButton: {
    float: 'right'
  }
}));

// dummy data so far
const players = [
    {
        nickname: "Valdomero"
    },
    {
        nickname: "Jovita"
    },
    {
        nickname: "Valdomero"
    },
    {
        nickname: "Jovita"
    },
    {
        nickname: "Valdomero"
    },
    {
        nickname: "Jovita"
    }
]

function Players({startGame, playing}) {
    const classes = useStyles();
    let button;
    if(players.length >= 5){
        button = <Button className={classes.playButton} variant="contained" color="primary" onClick={startGame}>
                    Jugar
                 </Button>
    }
    else {
        button = <Button className={classes.playButton} disabled variant="contained">Jugar</Button>
    }
    return <List className={classes.root}>
      {players.map((player) => (
        <ListItem>
          <ListItemAvatar>
          <Avatar alt="Primer Jugador" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            {player.nickname}
        </ListItem>
      ))}
      {!playing ? button : ""}
    </List>
}


Players.propTypes = {
  startGame: PropTypes.func.isRequired
}

export default Players;
