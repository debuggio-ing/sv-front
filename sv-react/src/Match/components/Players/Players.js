import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button,
         List,
         ListItem,
        ListItemAvatar,
        Avatar} from '@material-ui/core';
import PropTypes from 'prop-types'
import { deepOrange, deepPurple } from '@material-ui/core/colors';

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
  },
  ministro: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  director: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  }
}));


function Players({startGame,
                  playing,
                  players,
                  owner,
                  director,
                  minister}) {
    const classes = useStyles();
    let button;

    if (owner) {
      if(players.length >= 5){
          button = <Button className={classes.playButton}
           variant="contained" color="primary" onClick={startGame}>
                      Jugar
                   </Button>
      }
      else {
        <br/>
      }
    }

    return <List className={classes.root}>
      {players.map((player, index) => (
        <ListItem key={index}>
          <ListItemAvatar key={index}>
            {playing ?
              (minister === player.player_id) ?
                <Avatar alt="Ministro" src="/static/images/avatar/1.jpg" className={classes.ministro}/> :
                (director=== player.player_id)?
                  <Avatar alt="Director" src="/static/images/avatar/1.jpg" className={classes.director}/> :
                  <Avatar alt={player.username} src="/static/images/avatar/1.jpg" />
              : <Avatar alt={player.username} src="/static/images/avatar/1.jpg" />
            }
          </ListItemAvatar>
          {player.username}
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
