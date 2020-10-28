import React from 'react';
import './Match.csx';
//import logo from '../sv-logo.jpg';
import { Typography, Toolbar, AppBar, Card, CardContent, Grid, Container } from '@material-ui/core';
import Players from './components/Players/Players.js'
import Chat from './components/Chat/Chat.js'
import Board from './components/Board/Board.js'
import { connect } from 'react-redux'
import { startGame, vote } from './../redux/actions.js'
import Vote from './components/Vote/Vote.js'


class Match extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="match">

          <Container className="">
              <Typography gutterBottom variant="h5" component="h2">
                {this.props.currentGame.name}
              </Typography>
              <Grid container spacing={4}>

                      <Grid item key="chat" md={this.props.playing ? "3" : "6"}>
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
                        ? <Grid item key="board" xs="6" sm="6" md="6">
                            <Card className="">
                              <CardContent className="">
                                <Typography gutterBottom variant="h5" component="h2">
                                  Tablero
                                </Typography>
                                <Board proclamacionesMortifagas={Array(this.props.proclamacionesMortifagas).fill()}
                                       proclamacionesFenix={Array(this.props.proclamacionesFenix).fill()}/>
                              </CardContent>
                            </Card>
                          </Grid>
                        : <br/>
                      }

                      <Grid item key="players" md={this.props.playing ? "3" : "6"}>
                        <Card className="">
                          <CardContent className="">
                            <Typography gutterBottom variant="h5" component="h2">
                              Jugadores
                            </Typography>
                            <Players startGame={this.props.play} playing={this.props.playing}/>
                          </CardContent>
                        </Card>
                      </Grid>

                      {this.props.voting
                        ? <Grid item key="vote" md={this.props.playing ? "3" : "6"}>
                            <Card className="">
                              <CardContent className="">
                                <Typography gutterBottom variant="h5" component="h2">
                                  Votación
                                </Typography>
                                <Vote vote={this.props.vote}/>
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
  voting: state.voting
})

const mapDispatchToProps = dispatch => {
  return {
    play: () => dispatch(startGame),
    vote: (choosen) => {
      /* NICO METELE ACA
      gameService.vote(choosen).then( result => {
          dispatch(vote)
        }
      ).catch( err => {
        alert("No se pudo efectual el voto")
      })*/
      alert(choosen)
      dispatch(vote)
    }
  }
}

const connectionPartida = connect(mapStateToProps, mapDispatchToProps)(Match)


export  { connectionPartida as Match };
