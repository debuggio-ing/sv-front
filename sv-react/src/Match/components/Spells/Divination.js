import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, GridListTile } from '@material-ui/core';
import PropTypes from 'prop-types';
import Card from './../Card/Card.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Divination({cards}) {
  const styles = useStyles;
  return <Grid container xs={12} spacing={2}>
    {cards.map((card, index) => (
      <Grid xs={4} key={card.uniqueId}>
        {card.phoenix
          ? <Card type={"Fenix"} portrait={true} />
          : <Card type={"Mortifaga"} portrait={true} />}
      </Grid>
      )
    )}
  </Grid>
}



export default Divination;
