import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, GridListTile,  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Card from './../Card/Card.js'
import { history } from '@/_helpers';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const imgs_src = {
  'Order of the Phoenix': 'public/img/fenix_lealtad.png',
  'Death Eater': 'public/img/mortifago_lealtad.png'
}

function handleClose() {
  history.push('/')
  setOpen(false);
}

function Endgame({ currentGame}) {
  const winners = currentGame.phoenix_win ? 'Orden del Fénix' : 'Mortífagos'
  return (<Dialog
    open={true}
    onClose={handleClose}
  >
    <Grid container
      alignText='center' alignSelf='stretch' xs={12}
      justify='center' alignItems='center'>
      <DialogTitle>{"¡Felicitaciones " + winners + ", han ganado el juego!"}</DialogTitle>
      <Grid container
        alignText='center' alignSelf='stretch' xs={12}
        justify='center' alignItems='center'>
        <Grid container xs={6} justify='center' alignItems='center'>
          {currentGame.phoenix_win ?
            <Grid item xs={10} >
              <Grid container justify="center" alignItems="center">
                <img src={imgs_src["Order of the Phoenix"]} style={{ height: "300px" }} />
              </Grid>
            </Grid>
  
            : <Grid item xs={10} >
              <Grid container justify="center" alignItems="center">
                <img src={imgs_src["Death Eater"]} style={{ height: "300px" }} />
              </Grid>
            </Grid>
                    
          }
          <Button 
                    onClick={handleClose} 
                    > IR AL LOBBY 
                    </Button>
        </Grid>

  
      </Grid>
    </Grid>
  </Dialog>)
}

Endgame.propTypes = {
  currentGame: PropTypes.object.isRequired
}


export default Endgame;
