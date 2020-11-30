import React from 'react';

import { authenticationService, lobbyService } from '@/_services';
import { tokenRefreshException } from '@/_helpers';
import { Button, Typography, Label, Grid, List, ListItem, FormGroup, Checkbox, FormControlLabel } from '@material-ui/core';
import LobbyCard from './components/LobbyCard/LobbyCard.js'
import { connect } from 'react-redux'
import {
  joinGame, listLobbies, leaveGame, toggleStarted, toggleAvailable,
  toggleFinished, toggleFilter,
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
    // console.log("refresher", this.props.listAvailable)


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

  toggleFilter1() {
    this.props.toggleFilter()
    this.refresher()
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
       
        
          {this.props.showFilters 
          ? 
          
          <Grid container justify="flex-end">
            
            <Button variant="contained" color="primary"
            onClick={() => this.toggleFilter1()}>
           Esconder Filtros
          </Button>
            
        </Grid>

          : 
          <Grid container justify="flex-end">
          <Button variant="contained" color="primary"
            onClick={() => this.toggleFilter1()}>
            Mostrar Filtros
          </Button>
           </Grid>

        }
                 {this.props.showFilters 
          ? 
          <Grid container justify="flex-end">
        <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" checked={this.props.listAvailable} onChange={() => this.toggleAvailable()} name="FilterAvailable" />}
                label="Partidas Disponibles"
              />

              <FormControlLabel
                control={<Checkbox color="primary" checked={this.props.listStarted} onChange={() => this.toggleStarted()} name="FilterStarted" />}
                label="Partidas Comenzadas"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={this.props.listFinished} onChange={() => this.toggleFinished()} name="FilterFinished" />}
                label="Partidas Terminadas"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox color="primary" checked={this.props.listOwnGames} onChange={() => this.toggleOwnGames()} name="FilterUser" />}
                label="Tus Partidas"
              />
              <FormControlLabel
                control={<Checkbox color="primary" checked={!this.props.listOwnGames} onChange={() => this.toggleOwnGames()} name="NoFilter" />}
                label="Todas las Partidas"
              />
            </FormGroup>
            </Grid>
        : <br/>}

        <List>
          {this.props.lobbies.map((lobby) => (
            <ListItem key={lobby.id}>
              <LobbyCard lobby={lobby} joinGame={this.props.joinGame}
               listOwnGames={this.props.listOwnGames} />
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
  showFilters: state.showFilters,
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
          // console.log(lobby.id)
          dispatch({ ...joinGame, lobby })
          history.push("/match")
        }
      }
      ).catch(err => {
        alert("No se pudo unir a la partida")
      })
    },
    listLobbies: (available, started, finished, ownGames, allGames) => {
      lobbyService.listLobbies(available, started, finished, ownGames, allGames).then(lobbies => {
        if (Array.isArray(lobbies)) {
          dispatch({ ...listLobbies, lobbies })
        }
      }
      ).catch(err => {
        //alert("No se pudieron listar los lobbies")
        //clearInterval(intervalLL);
      }
      )
    },
    leave: () => {
      dispatch(leaveGame)

    },
    toggleFilter: () => {
      dispatch(toggleFilter)
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
