import React from 'react';
//import logo from '../sv-logo.jpg';
import { Typography, Toolbar, AppBar, Card, CardContent, Grid, Container, Button } from '@material-ui/core';
import Players from './components/Players/Players.js'
import Results from './components/Results/Results.js'
import Chat from './components/Chat/Chat.js'
import Board from './components/Board/Board.js'
import { connect } from 'react-redux'
import { startGame, actionvote, updateLobbyStatus, updateGameStatus, listProclaim } from './../redux/actions.js'
import Vote from './components/Vote/Vote.js'
import DirProclaim from './components/DirProclaim/DirProclaim'
import { gameService, lobbyService } from '@/_services'
import { history } from '@/_helpers';
import { array } from 'prop-types';

let intervalGP;

class Match extends React.Component {
  constructor(props){
    super(props);
  }

  reloadGamePublic(){
    if(this.props.currentGame.id == -1){
      history.push("/")
    }
    else{
      if(this.props.playing){
        this.props.gameStatus(this.props.currentGame.id);
      }
      else {
        this.props.lobbyStatus(this.props.currentGame.id);
      }
    }
  }

  startGame(){
    if(this.props.currentGame.id != -1){
      this.props.play(this.props.currentGame.id)
    }
  }

//const election = {proclamation:[{card_pos:11, to_proclaim: true},{card_pos:2, to_proclaim: false}], expelliarmus:true};
  proclaimCard(index){

    let election = {proclamation: [{card_pos: this.props.proclams[index].card_pos, to_proclaim: true}, {card_pos:this.props.proclams[1-index].card_pos, to_proclaim: false}]}

    gameService.postDirProcCards(this.props.currentGame.id, {...election, expelliarmus:true})
  }

  componentDidMount(){
    this.reloadGamePublic();
    intervalGP = setInterval(this.reloadGamePublic.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(intervalGP);
  }
  render() {
    return (
      <div className="match">
          <Container className="">
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.currentGame.name}
              </Typography>
              <Grid container spacing={4}>

                      <Grid item key="chat" md={this.props.playing ? 3 : 6}>
                        <Card className="">
                          <CardContent className="">
                            <Typography gutterBottom variant="h5" component="h2">
                              Chat
                            </Typography>
                            <Chat/>
                          </CardContent>
                        </Card>
                      </Grid>

                      {this.props.playing
                        ? <Grid item key="board" xs={6} sm={6} md={6}>
                            <Card className="">
                              <CardContent className="">
                                <Typography gutterBottom variant="h5" component="h2">
                                  Tablero
                                </Typography>
                                <Board proclamacionesMortifagas={Array(this.props.currentGame.score.bad).fill()}
                                       proclamacionesFenix={Array(this.props.currentGame.score.good).fill()}/>
                              </CardContent>
                            </Card>
                          </Grid>
                        : <br/>
                      }

                      <Grid item key="players" md={this.props.playing ? 3 : 6}>
                        <Card className="">
                          <CardContent className="">
                            <Typography gutterBottom variant="h5" component="h2">
                              Jugadores
                            </Typography>
                            <Players startGame={() => this.props.play(this.props.currentGame.id)}
                                                  playing = {this.props.playing}
                                                  voting = {this.props.voting}
                                                  currentGame = {this.props.currentGame}
                                                  proposeDirector = {(player_id) => this.props.proposeDirector(this.props.currentGame.id, player_id)}
                                                  />
                          </CardContent>
                        </Card>
                      </Grid>

                      {this.props.voting
                        ? <Grid item key="vote" md={this.props.playing ? 3 : 6}>
                            <Card className="">
                              <CardContent className="">
                                <Typography gutterBottom variant="h5" component="h2">
                                  Votación
                                </Typography>
                                <Vote vote={(chosen) => this.props.vote(chosen, this.props.currentGame.id)}/>
                              </CardContent>
                            </Card>
                          </Grid>
                        : <br/>
                      }

                      {!this.props.currentGame.voting && this.props.currentGame.client_director && this.props.currentGame.minister_proclaimed && this.props.currentGame.in_session
                        ? <Grid item key="dirProc" md={this.props.playing ? 3 : 6}>
                            <Card className="">
                              <CardContent className="">
                                <Typography gutterBottom variant="h5" component="h2">
                                  Proclamar
                                </Typography>
                                <DirProclaim proclams={this.props.proclams} proclaimCard={(chosen) => this.proclaimCard(chosen)} />
                              </CardContent>
                            </Card>
                          </Grid>
                        : <br/>
                      }

                      {this.props.playing && !this.props.currentGame.voting && (this.props.currentGame.in_session || (this.props.currentGame.semaphore != 0)) 
                        ? <Grid item key="results" xs={12}>
                            <Card className="">
                              <CardContent className="">
                                <Typography gutterBottom variant="h5" component="h2">
                                  Resultados
                                </Typography>
                                {(this.props.semaphore != 0) ? 
                                        <Typography>El ministro no fue elegido.</Typography>
                                        : <Typography>El ministro fue elegido.</Typography>}
                                <Results currentGame = {this.props.currentGame} />
                              </CardContent>
                            </Card>
                          </Grid>
                        : <br/>
                      }
              </Grid>
          </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  playing: state.playing,
  proclamacionesFenix: state.proclamacionesFenix,
  proclamacionesMortifagas: state.proclamacionesMortifagas,
  voting: state.voting,
  currentGame: state.currentGame,
  proclams: state.proclams
})

const mapDispatchToProps = dispatch => {
  return {
    play: (lobbyId) => {
      lobbyService.startMatch(lobbyId).then( result => {
          if(result.startConfirmation){
            dispatch(startGame)
          }
        }
      ).catch( err => {
        alert("No se pudo iniciar la partida")
      })
    },
    vote: (chosen, id) => {
      console.log(id)
      gameService.vote(chosen, id).then( result => {
          alert(chosen)
          dispatch(actionvote)
        }
      ).catch( err => {
        alert("No se pudo efectuar el voto")
      })
    },
    cardToProclaim: (chosen) => {
      gameService.cardToProclaim(chosen).then( result => {
          alert(chosen)
          dispatch(cardToProclaim)
        }
      ).catch( err => {
        alert("No se pudo efectuar la elección")
      })
    },
    proposeDirector: (gameId, player_id) => {
      gameService.nominate_director(gameId, player_id)
    },
    gameStatus: (gameId) => {
      gameService.gameStatus(gameId).then( game => {
          if(game.player_list){
            dispatch({...updateGameStatus, game})
            if(game.in_session && game.client_director && game.minister_proclaimed){
              gameService.getDirProcCards(gameId).then( proclams => {
                if(Array.isArray(proclams)){
                  console.log(proclams)
                  dispatch({...listProclaim, proclams})
                }
              }).catch(err => {
                alert("No se pudieron obtener las proclamaciones");
              })
            }
            if(game.score.good>=5 || game.score.bad>=6){
              alert("Juego terminado");
              clearInterval(intervalGP);
            }
          }
        }
      ).catch( err => {
        alert("No se pudo actualizar el estado de la partida");
        clearInterval(intervalGP);
      })
    },
    lobbyStatus: (lobbyId) => {
      lobbyService.getLobby(lobbyId).then( lobby => {
          if(lobby.started){
            dispatch({...updateLobbyStatus, lobby})
            gameService.gameStatus(lobbyId).then( game => {
                if(game.player_list){
                  dispatch({...updateGameStatus, game})
                  dispatch(startGame);
                }
              }
            ).catch( err => {
              alert("No se pudo actualizar el estado de la partida")
            });
          }
          else{
            if(lobby.id){
              dispatch({...updateLobbyStatus, lobby});
            }
          }
        }
      ).catch( err => {
        console.log(err)
        alert("No se pudo actualizar el estado del lobby");
        clearInterval(intervalGP);
      })
    }
  }
}

const connectionPartida = connect(mapStateToProps, mapDispatchToProps)(Match)


export  { connectionPartida as Match };
