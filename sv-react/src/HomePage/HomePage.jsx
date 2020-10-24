import React from 'react';

import { userService, authenticationService } from '@/_services';
import { List, ListItem } from '@material-ui/core';
import MatchCard from './components/MatchCard/MatchCard.js'
import { connect } from 'react-redux'
import { joinGame } from './../redux/actions.js'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
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
                <List>
                  {this.props.matches.map((match) => (
                    <ListItem>
                      <MatchCard match={match} joinGame={this.props.joinGame}/>
                    </ListItem>
                  ))}
                </List>
            </div>
        );
    }
}

const mapStateToProps = state => ({
  matches: state.matches,
  currentGame: state.currentGame
})

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (id) => dispatch({...joinGame, id})
  }
}

const connectionHome = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { connectionHome as HomePage };
