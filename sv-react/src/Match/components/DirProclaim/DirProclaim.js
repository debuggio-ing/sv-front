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

function DirProclaim({proclams, proclaimCard}) {
    let classes = useStyles();
    return <Grid container className={classes.root, classes.cardList} spacing={1}>
        {proclams.map( (proclam, index) =>  (
          <Grid xs={6} sm={6} md={6}>
           {proclam.phoenix

             ? <Card type={"Fenix"} portrait={true} onClick={() => proclaimCard(index)}/>
             : <Card type={"Mortifaga"} portrait={true} onClick={() => proclaimCard(index)}/>}

          </Grid>
          )
        )}
        </Grid>
}


DirProclaim.propTypes = {
  proclams: PropTypes.array.isRequired
}

export default DirProclaim;
