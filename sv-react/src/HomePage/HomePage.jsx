import React from 'react';

import { authenticationService, lobbyService } from '@/_services';
import { tokenRefreshException } from '@/_helpers';
import { List, ListItem, Button, Grid } from '@material-ui/core';
import LobbyCard from './components/LobbyCard/LobbyCard.js'
import { connect } from 'react-redux'
import { joinGame, listLobbies, listGames, leaveGame, toggleListing } from './../redux/actions.js'
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

    componentDidMount(){
      if(localStorage.getItem("currentUser")){
        this.props.listLobbies();
        this.props.leave();
        intervalLL = setInterval(this.props.listLobbies.bind(this), 1000);
      }
      else {
        history.push("/login")
      }
    }

    componentWillUnmount() {
      clearInterval(intervalLL);
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h2>¡Bienvenido! Crea una nueva sala o elige alguna disponible para jugar</h2>
                <Grid container justify="flex-end">
                  {this.props.listingLobbies
                  ?<Button variant="contained" color="secondary" onClick={() => this.props.toggleListing()}>
                    Listar Juegos
                  </Button>
                  :<Button variant="contained" color="secondary" onClick={() => this.props.toggleListing()}>
                    Listar Salas
                </Button>}
                </Grid>
                
                <List>
                  {this.props.lobbies.map((lobby) => (
                    <ListItem key={lobby.id}>
                      <LobbyCard lobby={lobby} joinGame={this.props.joinGame}/>
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
  listingLobbies: state.listingLobbies
})

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (id) => {
      lobbyService.joinLobby(id).then( lobby => {
          if(lobby.id){
            console.log(lobby.id)
            dispatch({...joinGame, lobby})
            history.push("/match")
          }
        }
      ).catch( err => {
        alert("No se pudo unir a la partida")
      })
    },
    toggleListing: () => {
      dispatch(toggleListing)
    },
    listLobbies: (lobbies) => {
      lobbyService.listLobbies().then( lobbies =>{
          if(Array.isArray(lobbies)){
            dispatch({...listLobbies, lobbies})
          }
        }
      ).catch( err => {
          alert("No se pudieron listar los lobbies")
          clearInterval(intervalLL);
        }
      )
    },
    listGames: (games) => {
      lobbyService.listGames().then( games =>{
          if(Array.isArray(games)){
            dispatch({...listGames, games})
          }
        }
      ).catch( err => {
          alert("No se pudieron listar los games")
          clearInterval(intervalLL);
        }
      )
    },
    leave: () => {
      dispatch(leaveGame)
    }
  }
}

const connectionHome = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { connectionHome as HomePage };
