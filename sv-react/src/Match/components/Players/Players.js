import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  Typography,
  Box
} from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from 'prop-types'
import { primaryLightgreen, secondaryLightblue, backgroundGray } from '@/Styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '72ch',
    backgroundColor: theme.palette.background.paper
  },
  title: {
    align: 'center'
  },
  inline: {
    display: 'inline',
  },
  playButton: {
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

function Players({ startGame = () => { },
  leaveGame,
  playing = 0,
  currentGame,
  proposeDirector,
  castKedavra,
  castImperio,
  castCrucio }) {
  const classes = useStyles();
  let button;
  let button2;
  let players = currentGame.players;
  let owner = currentGame.is_owner;
  let owner_alias = currentGame.owner_alias;
  let director = currentGame.director;
  let minister = currentGame.minister;
  let voting = currentGame.voting;
  let tortured = currentGame.tortured;
  let canElectDirector = currentGame.client_minister && !currentGame.in_session && !voting;
  let alive_players = currentGame.players.filter((player) => player.alive).length
  if (owner) {
    if (players.length >= 5) {
      button = <Button className={classes.playButton}
        variant="contained" color="primary" onClick={startGame}>
        Jugar
                   </Button>
    }
    else {
      <br />
    }
  }
  button2 = <Button className={classes.leaveButton}
    variant="contained" color="primary" onClick={leaveGame}>
    Salir
                   </Button>
  return <List className={classes.root}>

    {canElectDirector ? <Box align='center'>Seleccione un candidato a director</Box> : ""}
    {castKedavra ? <Box textAlign='center'  >¿Quien debe morir?</Box> : ""}
    {castImperio ? <Box textAlign='center'  >Elige al proximo ministro</Box> : ""}
    {castCrucio ? <Box textAlign='center'>Seleccione un jugador para ver su rol</Box> : ""}
    {players.map((player, index) => (
      <ListItem key={index}
        onClick={!player.alive ?
          () => { } :
          (castCrucio && !player.crucied
            && player.player_id != currentGame.minister) ?
            () => castCrucio(player.player_id) :
            (castKedavra && player.player_id != currentGame.minister) ?
              () => castKedavra(player.player_id) :
              (castImperio && player.player_id != currentGame.minister) ?
                () => castImperio(player.player_id) :
                ((player.player_id == currentGame.prev_minister && alive_players > 5) ||
                  player.player_id == currentGame.prev_director ||
                  player.player_id == currentGame.minister) ?
                  () => { } :
                  canElectDirector ?
                    () => proposeDirector(player.player_id) :
                    () => { }}
        style={!player.alive ?
          { opacity: 0.5 } :
          (castCrucio && !player.crucied
            && player.player_id != currentGame.minister) ?
            { cursor: "pointer" } :
            (castImperio && player.player_id != currentGame.minister) ?
              { cursor: "pointer" } :
              (castKedavra && player.player_id != currentGame.minister) ?
              { cursor: "pointer" } :
              ((player.player_id == currentGame.prev_minister && alive_players > 5) ||
                player.player_id == currentGame.prev_director ||
                player.player_id == currentGame.minister) ?
                undefined :

                  canElectDirector ?
                    { cursor: "pointer" } :
                    undefined}>
        <ListItemAvatar key={index}>
          {playing ?
            (parseInt(minister) === player.player_id) ?
              <Avatar alt="Ministro" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.ministro] : classes.ministro} /> :
              (parseInt(director) === player.player_id) ?
                <Avatar alt="Director" src="/static/images/avatar/1.jpg" className={voting ? [classes.voting, classes.director] : classes.director} /> :
                <Avatar alt={player.nickname} src="/static/images/avatar/1.jpg" />
            : <Avatar alt={player.nickname} src="/static/images/avatar/1.jpg" />
          }
        </ListItemAvatar>
        <ListItem key={index + "name"}>
          {player.nickname == owner_alias ? <b>{player.nickname}</b> : player.nickname}
        </ListItem>
        {player.role ?
          <ListItem key={index + "loyalty"}>
            {player.role == "Death Eater" ? <img key={index} src={"public/img/mortifago_lealtad.png"} style={{ height: "50px" }} /> :
              [player.role == "Voldemort" ? <img key={index} src={"public/img/voldemort.png"} style={{ height: "50px" }} /> :
                <img key={index} src={"public/img/fenix_lealtad.png"} style={{ height: "50px" }} />]}
          </ListItem> :
          <ListItem key={index + "loyalty"}>
            <img src={"public/img/unknown_lealtad.png"} style={{ height: "50px" }} />
          </ListItem>
        }
        <ListItem key={index + "voting"}>
          {voting ? (player.voted ? <CheckIcon /> : <MoreHorizIcon />) : <div />}
        </ListItem>
      </ListItem>
    ))}
    {!playing ? button : <div />}
    {!playing ? button2 : <div />}
  </List>
}


Players.propTypes = {
  currentGame: PropTypes.object.isRequired
}

export default Players;
