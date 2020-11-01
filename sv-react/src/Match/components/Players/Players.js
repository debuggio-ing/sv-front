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


function Players({startGame, playing, players, owner}) {
    const classes = useStyles();
    let button;
    if(owner){
        button = <Button className={classes.playButton} variant="contained" color="primary" onClick={startGame}>
                    Jugar
                 </Button>
    }
    else {
        button = <Button className={classes.playButton} disabled variant="contained">Jugar</Button>
    }
    return <List className={classes.root}>
      {players.map((player, index) => (
        <ListItem key={index}>
          <ListItemAvatar key={index}>
          <Avatar alt={player} src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            {player}
        </ListItem>
      ))}
      {!playing ? button : <div/>}
    </List>
}


Players.propTypes = {
  startGame: PropTypes.func.isRequired,
  playing: PropTypes.number.isRequired
}

export default Players;
