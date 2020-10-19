import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


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
