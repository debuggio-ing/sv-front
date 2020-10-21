import React from 'react';
import './Partida.css';
import logo from '../sv-logo.jpg';
import { Typography, Toolbar, AppBar, Card, CardContent, Grid, Container } from '@material-ui/core';
import Players from './components/Players.js'
import Chat from './components/Chat.js'
import Board from './components/Board.js'
import { connect } from 'react-redux'
import { startGame } from './../redux/actions.js'


class Partida extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div className="Partida">
        <header className="Partida-header">
          <AppBar position="relative">
          <Toolbar className="sv-toolBar">
            <img src={logo} className="S-V-logo" alt="logo" />
            <Typography variant="h6" color="inherit" noWrap>
              Secret Voldemort
            </Typography>
          </Toolbar>
          </AppBar>
          <Container className="" maxWidth="md">
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
                                <Board/>
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
                            <Players startGame={this.props.play}/>
                          </CardContent>
                        </Card>
                      </Grid>

              </Grid>
          </Container>
        </header>
      </div>
    )
  }
}

const mapStateToProps = state => ({ playing: state.playing })

const mapDispatchToProps = dispatch => {
  return {
    play: () => dispatch(startGame)
  }
}

const connectionPartida = connect(mapStateToProps, mapDispatchToProps)(Partida)


export  { connectionPartida as Partida };
