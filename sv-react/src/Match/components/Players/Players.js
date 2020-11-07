import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button,
         List,
         ListItem,
         ListItemAvatar,
         Avatar,
         Typography
                        } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
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
  },
  voting: {
    "border-style": "dashed",
    "border-color": "black"
  }
}));


function Players({startGame,
                  playing,
                  currentGame,
                  proposeDirector}) {
    const classes = useStyles();
    let button;
    let players = currentGame.players;
    let owner = currentGame.is_owner;
    let director = currentGame.director;
    let minister = currentGame.minister;
    let voting = currentGame.voting;
    let canElectDirector = currentGame.client_minister && !currentGame.in_session && !voting;
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

      {canElectDirector ? <Typography>Seleccione un candidato a director</Typography>: ""}
      {players.map((player, index) => (
        <ListItem key={index}
                  onClick={canElectDirector ? () => proposeDirector(player.player_id) : undefined}
                  style={canElectDirector ? {cursor: "pointer"} : undefined}>
          <ListItemAvatar key={index}>
            {playing ?
              (minister === player.player_id) ?
                <Avatar alt="Ministro" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.ministro] : classes.ministro}/> :
                (director=== player.player_id)?
                  <Avatar alt="Director" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.director] : classes.director}/> :
                  <Avatar alt={player.username} src="/static/images/avatar/1.jpg" />
              : <Avatar alt={player.username} src="/static/images/avatar/1.jpg" />
            }
          </ListItemAvatar>
          <ListItem>
            {player.username}
          </ListItem>
          <ListItem>
            {voting ? (player.voted ? <CheckIcon/> : <ClearIcon/>) : <div/>}
          </ListItem>
        </ListItem>
      ))}
      {!playing ? button : <div/>}
    </List>
}


Players.propTypes = {
  startGame: PropTypes.func.isRequired,
  playing: PropTypes.number.isRequired,
  proposeDirector: PropTypes.func
}

export default Players;
