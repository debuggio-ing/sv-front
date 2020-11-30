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
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: 'inline',
  },
  playButton: {
    float: 'right'
  },
  addBotButton: {
    float: 'right'
  },
  leaveButton: {
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
                  leaveGame,
                  addBot,
                  playing=0,
                  currentGame,
                  proposeDirector,
                  castKedavra}) {
    const classes = useStyles();
    let button;
    let button2;
    let button3;
    let players = currentGame.players;
    let owner = currentGame.is_owner;
    let owner_alias = currentGame.owner_alias;
    let director = currentGame.director;
    let minister = currentGame.minister;
    let voting = currentGame.voting;
    let canElectDirector = currentGame.client_minister && !currentGame.in_session && !voting;
    let alive_players = currentGame.players.filter((player) => player.alive).length
    if (owner) {
      if(players.length < currentGame.max_players){
      button3 = <Button className={classes.addBotButton}
          variant="contained" color="primary" onClick={addBot}>
                     Añadir Bot
                  </Button>
      }
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
       button2 = <Button className={classes.leaveButton}
           variant="contained" color="primary" onClick={leaveGame}>
                      Salir
                   </Button>
    return <List className={classes.root}>

      {canElectDirector ? <Typography>Seleccione un candidato a director</Typography>: ""}
      {castKedavra ? <Typography>¿Quien debe morir?</Typography>: ""}
      {players.map((player, index) => (
        <ListItem key={index}
                  onClick={!player.alive ?
                            () => {} :
                                ((player.player_id==currentGame.prev_minister && alive_players>5) || player.player_id==currentGame.prev_director || player.player_id==currentGame.minister) ?
                                () => {} :
                                    castKedavra ?
                                        () => castKedavra(player.player_id) :
                                        canElectDirector ?
                                            () => proposeDirector(player.player_id):
                                            () => {}}
                  style={!player.alive ?
                            {opacity: 0.5} :
                                ((player.player_id==currentGame.prev_minister && alive_players>5) || player.player_id==currentGame.prev_director || player.player_id==currentGame.minister) ?
                                undefined :
                                    castKedavra ?
                                        {cursor: "pointer"} :
                                        canElectDirector ?
                                            {cursor: "pointer"} :
                                            undefined}>
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
            {player.nickname == owner_alias ? <b>{player.nickname}</b>  : player.nickname}
          </ListItem>
          {player.role ?
            <ListItem key={index+"loyalty"}>
              {player.role=="Death Eater" ? <img key={index} src={"public/img/mortifago_lealtad.png"} style={{height:"50px"}}/> :
                                          [player.role=="Voldemort" ? <img key={index} src={"public/img/voldemort.png"} style={{height:"50px"}}/> :
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
      {!playing ? button3 : <div/>}
      {!playing ? button2 : <div/>}

    </List>
}


Players.propTypes = {
  currentGame: PropTypes.object.isRequired
}

export default Players;
