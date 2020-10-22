import React from 'react';

function Card({type}){
  if(type=="Mortifaga"){
    return <img src="public/img/mortifagos.png" style={{width:"100px"}, {height:"100px"}}/>
  }
  else if (type=="Fenix"){
    return <img src="public/img/fenix.png" style={{width:"100px"}, {height:"100px"}}/>
  }
  else {
    return <img src="public/img/nocard.png" style={{width:"100px"}, {height:"100px"}}/>
  }
}

export default Card;
