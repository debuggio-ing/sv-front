import React from 'react';

import { userService, authenticationService, lobbyService } from '@/_services';
import { List, ListItem, Button } from '@material-ui/core';
import LobbyCard from './components/LobbyCard/LobbyCard.js'
import { connect } from 'react-redux'
import { joinGame, listLobbies } from './../redux/actions.js'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
        this.doListLobbies()
    }

    doListLobbies() {
      lobbyService.listLobbies().then( lobbies =>{
          this.props.listLobbies(lobbies)
        }
      )
    }

    componentDidMount() {
        userService.getAll().then(users => this.setState({ users }));
    }

    render() {
        const { currentUser, users } = this.state;
        return (
            <div>
                <h1>Hi {currentUser.firstName}! playing {this.props.currentGame}</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {users &&
                    <ul>
                        {users.map(user =>
                            <li key={user.id}>{user.firstName} {user.lastName}</li>
                        )}
                    </ul>
                }
                <Button onClick={() => this.doListLobbies()}>Refrescar Lobbies</Button>
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
    joinGame: (id) => dispatch({...joinGame, id}),
    listLobbies: (lobbies) => dispatch({...listLobbies, lobbies})
  }
}

const connectionHome = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { connectionHome as HomePage };
