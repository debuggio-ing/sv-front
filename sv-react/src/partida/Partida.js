import React from 'react';
import './Partida.css';
import logo from '../sv-logo.jpg';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Players from './components/Players.js'
import Chat from './components/Chat.js'

const cards = [
    {
        "title": "Chat",
        "id":1,
        "component":
        <Chat />
    },
    {
        "title": "Jugadores",
        "id":2,
        "component":
        <Players/>
    }
];

function Partida() {
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
          {cards.map((card) => (
                <Grid item key={card.id} xs={12} sm={6} md={6}>
                  <Card className="">
                    <CardContent className="">
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      {card.component}
                    </CardContent>
                  </Card>
                </Grid>
            ))}
            </Grid>
        </Container>
      </header>
    </div>
  );
}

export default Partida;
