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

//Get_Cards

function DirProclaim({proclams}) {
    let classes = useStyles();
    return <Grid container className={classes.root, classes.cardList} spacing={1}>
        
        <Grid xs={6} sm={6} md={6}>
         proclams[0].phoenix
           ? <Card type={"Fenix"} portrait={false} clickAction={cardToProclaim}/>
           : <Card type={"Mortifaga"} portrait={false} clickAction={cardToProclaim}/>
        </Grid>
        <Grid xs={6} sm={6} md={6}>
         proclams[1].phoenix
           ? <Card type={"Fenix"} portrait={false} clickAction={cardToProclaim}/>
           : <Card type={"Mortifaga"} portrait={false} clickAction={cardToProclaim}/>
        </Grid>
      </Grid>
}


DirProclaim.propTypes = {
  cardToProclaim: PropTypes.func.isRequired
}

export default DirProclaim;
