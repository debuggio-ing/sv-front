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
    case "Adivination":
      url = "public/img/adivination.png"
      break;
    case "Crucio":
      url = "public/img/crucio.png"
      break;
    case "AvadaKedavra":
      url = "public/img/avadakedavra.png"
      break;
    case "AvadaKedavraExp":
      url = "public/img/avadakedavra_expeliarmus.png"
      break;
    case "NocardDE":
      url = "public/img/nocard_de.png"
      break;
    case "NocardDEEND":
      url = "public/img/nocard_de_ak.png"
      break;
    default:
      url = "public/img/nocard_fe.png"
      break;
  }
  return <img src={url} style={style} onClick={clickAction ? () => clickAction(type) : () => {}}/>
}

Card.propTypes = {
  type: PropTypes.string.isRequired,
  portrait: PropTypes.bool.isRequired,
  clickAction: PropTypes.func
}

export default Card;
