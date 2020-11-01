import React from 'react';

import { authenticationService, lobbyService } from '@/_services';
import { List, ListItem, Button } from '@material-ui/core';
import LobbyCard from './components/LobbyCard/LobbyCard.js'
import { connect } from 'react-redux'
import { joinGame, listLobbies, leaveGame } from './../redux/actions.js'
import { history } from '@/_helpers';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount(){
      this.props.listLobbies();
      this.props.leave();
      this.intervalLL = setInterval(this.props.listLobbies.bind(this), 1000);
    }

    componentWillUnmount() {
      clearInterval(this.intervalLL);
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi! playing {this.props.currentGame.name}</h1>
                <Button onClick={() => this.props.listLobbies()}>Refrescar Lobbies</Button>
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
  currentGame: state.currentGame
})

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (id) => {
      lobbyService.joinLobby(id).then( lobby => {
          dispatch({...joinGame, lobby})
          history.push("/match")
        }
      ).catch( err => {
        alert("No se pudo unir a la partida")
      })
    },
    listLobbies: (lobbies) => {
      lobbyService.listLobbies().then( lobbies =>{
          dispatch({...listLobbies, lobbies})
        }
      ).catch( err =>
        alert("No se pudieron listar los lobbies")
      )
    },
    leave: () => {
      dispatch(leaveGame)
    }
  }
}

const connectionHome = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { connectionHome as HomePage };
