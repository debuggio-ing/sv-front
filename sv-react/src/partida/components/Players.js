import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Divider, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));


function Players() {
    const classes = useStyles();
    return <List className={classes.root}>
      <ListItem >
      <ListItemAvatar>
      <Avatar alt="Primer Jugador" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        Primer Jugador
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar alt="Segundo Jugador" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        Segundo Jugador
      </ListItem>
    </List>
}

export default Players;
