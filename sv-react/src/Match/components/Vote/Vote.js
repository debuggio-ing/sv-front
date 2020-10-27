import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import Card from './../Card/Card.js'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  cardList:  {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  }
}));

function Vote({vote}) {
    let classes = useStyles();
    return <Grid container className={classes.root, classes.cardList} spacing="1">
        <Grid xs="6" sm="6" md="6">
          <Card type={"Lumus"} portrait={false} clickAction={vote}/>
        </Grid>
        <Grid xs="6" sm="6" md="6">
          <Card type={"Nox"} portrait={false} clickAction={vote}/>
        </Grid>
      </Grid>
}


Vote.propTypes = {
  vote: PropTypes.func.isRequired
}

export default Vote;
