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
import { primaryLightgreen, secondaryLightblue, backgroundGray } from '@/Styles'

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

function Players({startGame=()=>{},
                  playing=0,
                  currentGame,
                  proposeDirector,
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
      {castKedavra ? <Typography>¿Quien debe morir?</Typography>: ""}
      {players.map((player, index) => (
        <ListItem key={index}
                  onClick={!player.alive ? () => {} : castKedavra ? () => castKedavra(player.player_id) : canElectDirector ? () => proposeDirector(player.player_id): () => {}}
                  style={!player.alive ? {opacity: 0.5} : castKedavra ? {cursor: "pointer"} :canElectDirector ? {cursor: "pointer"} : undefined}>
          <ListItemAvatar key={index}>
            {playing ?
              (parseInt(minister) === player.player_id) ?
                <Avatar alt="Ministro" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.ministro] : classes.ministro}/> :
                (parseInt(director)=== player.player_id)?
                  <Avatar alt="Director" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.director] : classes.director}/> :
                  <Avatar alt={player.nickname} src="/static/images/avatar/1.jpg" />
              : <Avatar alt={player.nickname} src="/static/images/avatar/1.jpg" />
            }
          </ListItemAvatar>
          <ListItem key={index+"name"}>
            {player.nickname}
          </ListItem>
          {player.role ?
            <ListItem key={index+"loyalty"}>
              {player.role=="Death Eater" ? <img key={index} src={"public/img/mortifago_lealtad.png"} style={{height:"50px"}}/> :
                                          [player.role=="voldemort" ? <img key={index} src={"public/img/voldemort.png"} style={{height:"50px"}}/> :
                                                                      <img key={index} src={"public/img/fenix_lealtad.png"} style={{height:"50px"}}/>]}
            </ListItem> :
            <ListItem key={index+"loyalty"}>
              <img src={"public/img/unknown_lealtad.png"} style={{height:"50px"}}/>
            </ListItem>
          }
          <ListItem key={index+"voting"}>
            {voting ? (player.voted ? <CheckIcon/> : <MoreHorizIcon/>) : <div/>}
          </ListItem>
        </ListItem>
      ))}
      {!playing ? button : <div/>}
    </List>
}


Players.propTypes = {
  currentGame: PropTypes.object.isRequired
}

export default Players;
