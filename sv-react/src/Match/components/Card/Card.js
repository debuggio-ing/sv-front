import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  }
}));

function Card({type, portrait, clickAction}){
  const classes = useStyles();
  let style = ( portrait ? {height:"100px"} : {height:"80px"} );
  let url = "";
  switch (type) {
    case "Mortifaga":
      url = "public/img/mortifagos.png"
      break;
    case "Fenix":
      url = "public/img/fenix.png"
      break;
    case "Lumos":
      url = "public/img/lumos.png"
      break;
    case "Nox":
      url = "public/img/nox.png"
      break;
    case "Pila-Descarte":
      url = "public/img/discarded-pool.png"
      break;
    case "Pila-Robo":
      url = "public/img/deck.png"
      break;
    default:
      url = "public/img/nocard.png"
      break;
  }
  return <img src={url} style={style} onClick={() => clickAction(type)}/>
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  portrait: PropTypes.bool.isRequired,
  clickAction: PropTypes.func
}

export default Card;
