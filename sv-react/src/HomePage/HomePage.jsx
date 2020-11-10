import React from 'react';

import { authenticationService, lobbyService } from '@/_services';
import { tokenRefreshException } from '@/_helpers';
import { Typography, Label, Grid, List, ListItem, FormGroup, Checkbox, FormControlLabel } from '@material-ui/core';
import LobbyCard from './components/LobbyCard/LobbyCard.js'
import { connect } from 'react-redux'
import { joinGame, listLobbies, leaveGame } from './../redux/actions.js'
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
              
                <Typography gutterBottom variant="h5" component="h2">
                ¡Bienvenido! Crea una nueva sala o elige alguna disponible para jugar
                </Typography>

                
                  <Grid container justify="flex-end">
                  
                  <FormGroup row alignItems='right'>
                  <FormControlLabel
                  control={<br/>}
                  label={<Typography gutterBottom variant="body" component="h5">
                     Filtros: 
                    </Typography>}
                  />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={true} onChange={() => {}} name="FilterStarted" />}
                  label="Game Started"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={true} onChange={() => {}} name="FilterFinished" />}
                  label="Game Finished"
                />
                <FormControlLabel
                  control={<Checkbox color="primary" checked={true} onChange={() => {}} name="FilterUser" />}
                  label="Games you are in"
                />
                </FormGroup>
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
  currentGame: state.currentGame
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
    leave: () => {
      dispatch(leaveGame)
    }
  }
}

const connectionHome = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { connectionHome as HomePage };
