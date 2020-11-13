import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button,
         List,
         ListItem,
         ListItemAvatar,
         Avatar,
         Typography
                        } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types'
import { primaryLightgreen, secondaryLightblue } from '@/Styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline',
  },
  playButton: {
    float: 'right'
  },
  director: {
    color: theme.palette.getContrastText(primaryLightgreen),
    backgroundColor: primaryLightgreen,
  },
  ministro: {
    color: theme.palette.getContrastText(secondaryLightblue),
    backgroundColor: secondaryLightblue,
  },
  voting: {
    "border-style": "dashed",
    "border-color": "black"
  }
}));


function Players({startGame,
                  playing,
                  currentGame,
                  proposeDirector,
                  selected,
                  castKedavra}) {
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
      {castKedavra ? <Typography>Matate un flaco</Typography>: ""}
      {players.map((player, index) => (
        <ListItem key={index}
                  onClick={castKedavra ? () => castKedavra(player.player_id) : [canElectDirector ? () => proposeDirector(player.player_id): undefined]}
                  style={castKedavra ? {cursor: "pointer"} :canElectDirector ? {cursor: "pointer"} : undefined}>
          <ListItemAvatar key={index}>
            {playing ?
              (parseInt(minister) === player.player_id) ?
                <Avatar alt="Ministro" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.ministro] : classes.ministro}/> :
                (parseInt(director)=== player.player_id)?
                  <Avatar alt="Director" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.director] : classes.director}/> :
                  <Avatar alt={player.username} src="/static/images/avatar/1.jpg" />
              : <Avatar alt={player.username} src="/static/images/avatar/1.jpg" />
            }
          </ListItemAvatar>
          <ListItem>
            {player.username}
          </ListItem>
          {player.role ?
            <ListItem>
              {player.role=="Death Eater" ? <img src={"public/img/mortifago_lealtad.png"} style={{height:"50px"}}/> :
                                          [player.role=="voldemort" ? <img src={"public/img/voldemort.png"} style={{height:"50px"}}/> :
                                                                      <img src={"public/img/fenix_lealtad.png"} style={{height:"50px"}}/>]}
            </ListItem> :
            <ListItem>
              <img src={"public/img/unknown_lealtad.png"} style={{height:"50px"}}/>
            </ListItem>
          }
          <ListItem>
            {voting ? (player.voted ? <CheckIcon/> : <MoreHorizIcon/>) : <div/>}
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
