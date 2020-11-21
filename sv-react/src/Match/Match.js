import React from 'react';
//import logo from '../sv-logo.jpg';
import { Typography, Toolbar, AppBar, Card, CardContent, Grid, Container, Button } from '@material-ui/core';
import Players from './components/Players/Players.js'
import Results from './components/Results/Results.js'
import Chat from './components/Chat/Chat.js'
import Board from './components/Board/Board.js'
import { connect } from 'react-redux'
import { startGame, actionvote, updateLobbyStatus, updateGameStatus, listCards, listProclaim, joinGame, startAvadaKedavra } from './../redux/actions.js'
import Vote from './components/Vote/Vote.js'
import Deck from './components/Deck/Deck.js'
import Spell from './components/Spells/Spell.js'
import Proclaim from './components/Proclaim/Proclaim.js'
import { gameService, lobbyService } from '@/_services'
import { history } from '@/_helpers';
import { array } from 'prop-types';
import { backgroundGray, phoenixRed } from '@/Styles'

let intervalGP;

class Match extends React.Component {
  constructor(props) {
    super(props);
    if (props.location.search && props.location.search.includes("id=")) {
      let query = new URLSearchParams(window.location.search);
      this.props.joinGame(query.get("id"));
    }
    this.classes = {
      card:  {
        backgroundColor: backgroundGray
      }
    };
  }

  reloadGamePublic() {
    if (this.props.currentGame.id == -1) {
      history.push("/")
    }
    else {
      if (this.props.playing) {
        this.props.gameStatus(this.props.currentGame.id);
      }
      else {
        this.props.lobbyStatus(this.props.currentGame.id);
      }
    }
  }

  startGame() {
    if (this.props.currentGame.id != -1) {
      this.props.play(this.props.currentGame.id)
    }
  }

  proclaimCard(index) {
    const election = this.props.proclams[index].card_pos
    gameService.postProcCards(this.props.currentGame.id, election)
  }

  componentDidMount() {
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
                  <Chat />
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
                    <Board currentGame={this.props.currentGame} />
                  </CardContent>
                </Card>
              </Grid>
              : <br />
            }

            <Grid item key="players" md={this.props.playing ? 3 : 6}>
              <Card className="">
                <CardContent className="">
                  <Typography gutterBottom variant="h5" component="h2">
                    Jugadores
                            </Typography>
                  <Players startGame={() => this.props.play(this.props.currentGame.id)}
                    playing={this.props.playing}
                    voting={this.props.voting}
                    currentGame={this.props.currentGame}
                    proposeDirector={(player_id) => this.props.proposeDirector(this.props.currentGame.id, player_id)}
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
                    <Vote vote={(chosen) => this.props.vote(chosen, this.props.currentGame.id)} />
                  </CardContent>
                </Card>
              </Grid>
              : <br />
            }
            {this.props.currentGame.in_session &&
            this.props.currentGame.director_proclaimed &&
            this.props.currentGame.client_minister &&
            this.props.currentGame.last_proc_negative
            ?
              <Spell cards={this.props.cards}
              spell={this.props.spell}
              currentGame={this.props.currentGame}
              spellType={this.props.spellType}  />
              : <br />
            }

            {(((this.props.currentGame.client_director &&
            this.props.currentGame.minister_proclaimed &&
            !this.props.currentGame.director_proclaimed)
            || (this.props.currentGame.client_minister &&
              !this.props.currentGame.minister_proclaimed))
            && this.props.currentGame.in_session)
              ? <Grid item key="Proc" md={this.props.playing ? 3 : 6}>
                <Card className="">
                  <CardContent className="">
                    {this.props.currentGame.client_director ?
                      <Typography gutterBottom variant="h5" component="h2"> Proclamar </Typography>
                      :<Typography gutterBottom variant="h5" component="h2"> Descartar </Typography>
                    }
                    <Proclaim proclams={this.props.proclams} proclaimCard={(chosen) => this.proclaimCard(chosen)} />
                  </CardContent>
                </Card>
              </Grid>
              : <br />
            }

            {this.props.playing && !this.props.currentGame.voting && (this.props.currentGame.in_session || (this.props.currentGame.semaphore != 0))
              ? <Grid item key="results" xs={12}>
                <Card className="">
                  <CardContent className="">
                    <Typography gutterBottom variant="h5" component="h2">
                      Resultados
                                </Typography>
                    {this.props.currentGame.in_session ?
                      <Typography>{this.props.currentGame.player_list.filter((player) => player.player_id==this.props.currentGame.minister)[0].nickname} y
                                  {" "+ this.props.currentGame.player_list.filter((player) => player.player_id==this.props.currentGame.director)[0].nickname} fueron elegidos
                      </Typography>
                      : <Typography>El gobierno NO fue elegido.</Typography>
                    }
                    <Results currentGame={this.props.currentGame} />
                  </CardContent>
                </Card>
              </Grid>
              : <br />
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
  proclams: state.proclams,
  currentGame: state.currentGame,
  cards: state.cards,
  spellType: state.spellType
})

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (id) => {
      lobbyService.joinLobby(id).then(lobby => {
        console.log(lobby)
        if (lobby.id) {
          console.log(lobby.id)
          dispatch({ ...joinGame, lobby })
          history.push("/match")
        }
      }
      ).catch(err => {
        alert("Id incorrecto")
      })
    },
    play: (lobbyId) => {
      lobbyService.startMatch(lobbyId).then(result => {
        if (result.startConfirmation) {
          dispatch(startGame)
        }
      }
      ).catch(err => {
        alert("No se pudo iniciar la partida")
      })
    },
    spell: (id) => {
      gameService.getSpell(id).then(spell => {
        console.log(spell);
        switch (typeof(spell)) {
          case "number":
            dispatch(startAvadaKedavra)
            break;
          default:
            dispatch({ ...listCards, cards: spell })
            break;
        }
      }).catch(err => {
        console.log(err)
        // alert("No se pudo lanzar el hechizo.")
      })
    },
    vote: (chosen, id) => {
      console.log(id)
      gameService.vote(chosen, id).then(result => {
        dispatch(actionvote)
      }
      ).catch(err => {
        alert("No se pudo efectuar el voto")
      })
    },
    cardToProclaim: (chosen) => {
      gameService.cardToProclaim(chosen).then(result => {
        alert(chosen)
        dispatch(cardToProclaim)
      }
      ).catch(err => {
        alert("No se pudo efectuar la elección")
      })
    },
    proposeDirector: (gameId, player_id) => {
      gameService.nominateDirector(gameId, player_id)
    },
    gameStatus: (gameId) => {
      gameService.gameStatus(gameId).then(game => {
        if (game.player_list) {
          dispatch({ ...updateGameStatus, game })
          if (game.in_session && ((game.client_director && game.minister_proclaimed) || (game.client_minister && !game.minister_proclaimed))) {
            gameService.getProcCards(gameId).then(proclams => {
              if (Array.isArray(proclams)) {
                console.log(proclams)
                dispatch({ ...listProclaim, proclams })
              }
            }).catch(err => {
              alert("No se pudieron obtener las proclamaciones");
            })
          }
          if (game.score.good >= 5 || game.score.bad >= 6) {
            alert("Juego terminado");
            clearInterval(intervalGP);
          }
        }
      }
      ).catch(err => {
        alert("No se pudo actualizar el estado de la partida");
        clearInterval(intervalGP);
      })
    },
    lobbyStatus: (lobbyId) => {
      lobbyService.getLobby(lobbyId).then(lobby => {
        if (lobby.started) {
          dispatch({ ...updateLobbyStatus, lobby })
          gameService.gameStatus(lobbyId).then(game => {
            if (game.player_list) {
              dispatch({ ...updateGameStatus, game })
              dispatch(startGame);
            }
          }
          ).catch(err => {
            alert("No se pudo actualizar el estado de la partida")
          });
        }
        else {
          if (lobby.id) {
            dispatch({ ...updateLobbyStatus, lobby });
          }
        }
      }
      ).catch(err => {
        console.log(err)
        alert("No se pudo actualizar el estado del lobby");
        clearInterval(intervalGP);
      })
    }
  }
}

const connectionPartida = connect(mapStateToProps, mapDispatchToProps)(Match)


export { connectionPartida as Match };
