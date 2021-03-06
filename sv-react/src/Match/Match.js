import React from 'react';
//import logo from '../sv-logo.jpg';
import { Typography, Toolbar, AppBar, Card, CardContent, Grid, Container, Button } from '@material-ui/core';
import Players from './components/Players/Players.js'
import Results from './components/Results/Results.js'
import Chat from './components/Chat/Chat.js'
import Board from './components/Board/Board.js'
import { connect } from 'react-redux'
import {
  startGame, actionvote, updateLobbyStatus, updateGameStatus, listCards,
  listProclaim, joinGame, startAvadaKedavra, startImperio, startCrucio,
  updateCrucioRole
} from './../redux/actions.js'
import Vote from './components/Vote/Vote.js'
import Endgame from './components/Endgame/Endgame.js'
import Deck from './components/Deck/Deck.js'
import Spell from './components/Spells/Spell.js'
import Proclaim from './components/Proclaim/Proclaim.js'
import Expelliarmus from './components/Expelliarmus/Expelliarmus.js'
import { gameService, lobbyService } from '@/_services'
import { history } from '@/_core';
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
      card: {
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
    gameService.postProcCards(this.props.currentGame.id, election, false)
  }

  sendMessage(message) {
    // const election = this.props.proclams[index].card_pos
    gameService.sendMessageService(this.props.currentGame.id, message)
  }

  componentDidMount() {
    this.reloadGamePublic();
    intervalGP = setInterval(this.reloadGamePublic.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(intervalGP);
  }

  expelliarmus() {
    gameService.postProcCards(this.props.currentGame.id, 99, true)

  }

  render() {
    this.spellTime = this.props.currentGame.in_session &&
                this.props.currentGame.director_proclaimed &&
                this.props.currentGame.client_minister &&
                this.props.currentGame.last_proc_negative;

    this.expeliarmusTime = this.props.currentGame.in_session && this.props.currentGame.score.bad == 5 &&
                      this.props.currentGame.expelliarmus && this.props.currentGame.client_minister
                      && !this.props.currentGame.minister_proclaimed;

    this.proclamationTime = (((this.props.currentGame.client_director &&
                        this.props.currentGame.minister_proclaimed &&
                        !this.props.currentGame.director_proclaimed)
                        || (this.props.currentGame.client_minister &&
                          !this.props.currentGame.minister_proclaimed
                          && !this.props.currentGame.expelliarmus))
                        && this.props.currentGame.in_session);

    this.resultsTime = this.props.playing && !this.props.currentGame.voting &&
                  (this.props.currentGame.in_session || (this.props.currentGame.semaphore != 0))
                  && this.props.currentGame.players.length>0 && this.props.currentGame.minister!=-1;
    return (
      <div className="match">
        <Container className="" style={{"maxWidth": "95%"}}>
          <Typography gutterBottom variant="h5" component="h2">
            {this.props.currentGame.name}
          </Typography>
          <Grid container spacing={4}>

            <Grid item key="chat" md={this.props.playing ? 4 : 6}>
              <Card className="">
                <CardContent className="">
                  <Chat sendMessage={(message) => this.sendMessage(message)}
                    messages={this.props.currentGame.messages} />
                </CardContent>
              </Card>
            </Grid>

            {this.props.playing
              ? <Grid item key="board" xs={4} sm={4} md={4}>
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

            <Grid item key="players" md={this.props.playing ? 4 : 6}>
              <Card className="">
                <CardContent className="">
                  <Typography gutterBottom variant="h5" component="h2">
                    Jugadores
                            </Typography>
                  <Players startGame={() => this.props.play(this.props.currentGame.id)}
                    leaveGame={() => this.props.leaveGame(this.props.currentGame.id)}
                    addBot={() => this.props.addBot(this.props.currentGame.id)}
                    playing={this.props.playing}
                    voting={this.props.voting}
                    currentGame={this.props.currentGame}
                    proposeDirector={(player_id) => this.props.proposeDirector(this.props.currentGame.id, player_id)}
                  />
                </CardContent>
              </Card>
            </Grid>
            {this.props.voting
              ? <Grid item key="vote" md={this.props.playing ? 2 : 6}>
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
            {this.spellTime
              ?
              <Spell cards={this.props.cards}
                spell={this.props.spell}
                role={this.props.crucioRole}
                currentGame={this.props.currentGame}
                spellType={this.props.spellType} />
              : <br />
            }


            {this.expeliarmusTime ?
              <Expelliarmus game_id={this.props.currentGame.id} />
              : <br />
            }

            {this.proclamationTime
              ? <Grid item key="Proc" md={this.props.playing ? 2 : 6}>
                <Card className="">
                  <CardContent className="">
                    {this.props.currentGame.client_director ?
                      <Typography gutterBottom variant="h5" component="h2"> Proclamar </Typography>
                      : <Typography gutterBottom variant="h5" component="h2"> Descartar </Typography>
                    }
                    <Proclaim proclams={this.props.proclams} proclaimCard={(chosen) => this.proclaimCard(chosen)} />
                    {(this.props.currentGame.score.bad == 5 && !this.props.currentGame.expelliarmus &&
                      this.props.currentGame.client_director && this.props.currentGame.in_session) ?
                      <Button onClick={() => this.expelliarmus()}> Expelliarmus</Button>
                      : <br />
                    }
                  </CardContent>
                </Card>
              </Grid>
              : <br />
            }

            {this.resultsTime
              ? <Grid item key="results" xs={12}>
                <Card className="">
                  <CardContent className="">
                    <Typography gutterBottom variant="h5" component="h2">
                      Resultados
                                </Typography>
                    {this.props.currentGame.in_session && this.props.currentGame.director!=-1 ?
                      <Typography>{this.props.currentGame.players.filter((player) => player.player_id == this.props.currentGame.minister)[0].nickname} y
                                  {" " + this.props.currentGame.players.filter((player) => player.player_id == this.props.currentGame.director)[0].nickname} fueron elegidos
                      </Typography>
                      : <Typography>El gobierno NO fue elegido.</Typography>
                    }
                    <Results currentGame={this.props.currentGame} />
                  </CardContent>
                </Card>
              </Grid>
              : <br />
            }

            {this.props.currentGame.end
            ? <Endgame currentGame={this.props.currentGame}/>
            : <br />}
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
  crucioRole: state.crucioRole,
  expelliarmus: state.expelliarmus,
  currentGame: state.currentGame,
  cards: state.cards,
  spellType: state.spellType
})

const mapDispatchToProps = dispatch => {
  return {
    joinGame: (id) => {
      lobbyService.joinLobby(id).then(lobby => {
        //console.log(lobby)
        if (lobby.id) {
          //console.log(lobby.id)
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
    addBot: (lobbyId) => {
      lobbyService.addBot(lobbyId).then(result => {
        alert("added")
      }
      ).catch(err => {
        alert("No se pudo agregar el bot")
      })
    },
    leaveGame: (lobbyId) => {
      lobbyService.leaveMatch(lobbyId).then(result => {
        if (result.startConfirmation) {
          dispatch(leaveGame)
          history.push('/');
        }
        history.push('/');
      }
      ).catch(err => {
        alert("La partida no existe")
      })
    },
    spell: (id) => {
      gameService.getSpell(id).then(spell => {
        //console.log(spell)
        switch (spell["spell_type"]) {
          case "Divination":
            dispatch({ ...listCards, cards: spell["cards"] })
            break;
          case "Avada Kedavra":
            dispatch(startAvadaKedavra);
            break;
          case "Crucio":
            dispatch(startCrucio)
            if (spell["role"]) {
              let crucioRole = spell["role"]
              dispatch({ ...updateCrucioRole, crucioRole })
            }
            break;
          case "Imperio":
            dispatch(startImperio);
            break;
          default:
            //console.log('There has been a mistake with spells')
            break;
        }
      }).catch(err => {
        //console.log(err)
        // alert("No se pudo lanzar el hechizo.")
      })
    },
    vote: (chosen, id) => {
      //console.log(id)
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
          if (game.in_session
            && ((game.client_director && game.minister_proclaimed)
              || (game.client_minister
                && !game.minister_proclaimed
                && !game.expelliarmus))) {
            gameService.getProcCards(gameId).then(proclams => {
              if (Array.isArray(proclams)) {
                //console.log(proclams)
                dispatch({ ...listProclaim, proclams })
              }
            }).catch(err => {
              //alert("No se pudieron obtener las proclamaciones");
            })
          }
          if (game.score.good >= 5 || game.score.bad >= 6) {
            clearInterval(intervalGP);
          }
        }
      }
      ).catch(err => {
        //alert("No se pudo actualizar el estado de la partida");
        //clearInterval(intervalGP);
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
            //alert("No se pudo actualizar el estado de la partida")
            //history.push("/")
          });
        }
        else {
          if (lobby.id) {
            dispatch({ ...updateLobbyStatus, lobby });
          }
        }
      }
      ).catch(err => {
        //console.log(err)
        //alert("No se pudo actualizar el estado del lobby");
        //clearInterval(intervalGP);
      })
    }
  }
}

const connectionPartida = connect(mapStateToProps, mapDispatchToProps)(Match)

export { connectionPartida as Match };
