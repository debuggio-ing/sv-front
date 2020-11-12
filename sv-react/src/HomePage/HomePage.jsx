import React from 'react';

import { authenticationService, lobbyService } from '@/_services';
import { tokenRefreshException } from '@/_helpers';
import { Typography, Label, Grid, List, ListItem, FormGroup, Checkbox, FormControlLabel } from '@material-ui/core';
import LobbyCard from './components/LobbyCard/LobbyCard.js'
import { connect } from 'react-redux'
import {
  joinGame, listLobbies, leaveGame, toggleStarted, toggleAvailable,
  toggleFinished,
  toggleOwnGames
} from './../redux/actions.js'
import { history } from '@/_helpers';

let intervalLL;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: authenticationService.currentUserValue,
      users: null
    };
  }

  componentDidMount() {
    if (localStorage.getItem("currentUser")) {
      this.props.leave()

      this.refresher()
    }
    else {
      history.push("/login")
    }
  }

  refresher() {
    console.log("refresher", this.props.listAvailable)


    clearInterval(intervalLL);

    intervalLL = setInterval(this.listLobbiesWrapper.bind(this), 1000);
  }

  listLobbiesWrapper() {
    this.props.listLobbies(this.props.listAvailable,
      this.props.listStarted,
      this.props.listFinished,
      this.props.listOwnGames,
      !this.props.listOwnGames);
  }

  componentWillUnmount() {
    clearInterval(intervalLL);
  }

  toggleAvailable() {
    this.props.toggleAvailable()
    this.refresher()
  }

  toggleStarted() {
    this.props.toggleStarted()
    this.refresher()
  }

  toggleFinished() {
    this.props.toggleFinished()
    this.refresher()
  }

  toggleOwnGames() {
    this.props.toggleOwnGames()
    this.refresher()
  }

  render() {
    const { currentUser, users } = this.state;
    return (
      <div>

        <Typography gutterBottom variant="h5" component="h2">
          ¡Bienvenido! Crea una nueva sala o elige alguna disponible para jugar
                </Typography>


        <Grid container justify="flex-end">


          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="primary" checked={Boolean(this.props.listAvailable)} onChange={() => this.toggleAvailable()} name="FilterAvailable" />}
              label="Partidas Disponibles"
            />

            <FormControlLabel
              control={<Checkbox color="primary" checked={Boolean(this.props.listAvailable)} onChange={() => this.toggleStarted()} name="FilterStarted" />}
              label="Partidas Comenzadas"
            />
            <FormControlLabel
              control={<Checkbox color="primary" checked={Boolean(this.props.listAvailable)} onChange={() => this.toggleFinished()} name="FilterFinished" />}
              label="Partidas Terminadas"
            />
          </FormGroup>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox color="primary" checked={Boolean(this.props.listAvailable)} onChange={() => this.toggleOwnGames()} name="FilterUser" />}
              label="Tus Partidas"
            />
            <FormControlLabel
              control={<Checkbox color="primary" checked={!Boolean(this.props.listAvailable)} onChange={() => this.toggleOwnGames()} name="NoFilter" />}
              label="Todas las Partidas"
            />
          </FormGroup>
        </Grid>

        <List>
          {this.props.lobbies.map((lobby) => (
            <ListItem key={lobby.id}>
              <LobbyCard lobby={lobby} joinGame={this.props.joinGame} />
            </ListItem>
          ))}
        </List>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  lobbies: state.lobbies,
  currentGame: state.currentGame,

  listAvailable: state.listAvailable,
  listOwnGames: state.listOwnGames,
  listStarted: state.listStarted,
  listFinished: state.listFinished,
  listAll: state.listAll

})

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (id) => {
      lobbyService.joinLobby(id).then(lobby => {
        if (lobby.id) {
          console.log(lobby.id)
          dispatch({ ...joinGame, lobby })
          history.push("/match")
        }
      }
      ).catch(err => {
        alert("No se pudo unir a la partida")
      })
    },
    listLobbies: (available, started, finished, ownGames, allGames) => {
      console.log("map to dispatch", available)
      lobbyService.listLobbies(available, started, finished, ownGames, allGames).then(lobbies => {
        if (Array.isArray(lobbies)) {
          dispatch({ ...listLobbies, lobbies })
        }
      }
      ).catch(err => {
        alert("No se pudieron listar los lobbies")
        clearInterval(intervalLL);
      }
      )
    },
    leave: () => {
      dispatch(leaveGame)
    },
    toggleAvailable: () => {
      dispatch(toggleAvailable)
    },
    toggleStarted: () => {
      dispatch(toggleStarted)
    },
    toggleFinished: () => {
      dispatch(toggleFinished)
    },
    toggleOwnGames: () => {
      dispatch(toggleOwnGames)
    }
  }
}

const connectionHome = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { connectionHome as HomePage };
