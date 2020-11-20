import React from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

const messages = [
    {
        "text": "Que bonita implementación del clasico juego Secret Voldemort!",
        "from": "Maw"
    },
    {
        "text": "Cierto! La mejor del condado",
        "from": "Lau"
    }
]

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

function Chat({sendMessage, key}) {
    const classes = useStyles();
    return (<div>

        <List className="chatMessages">
          {messages.map((message, index) => (
              <ListItem key={index}>
              <ListItemAvatar key={index}>
              <Avatar alt={message.from} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                {message.text}
              </ListItem>
          ))}
        </List>

        <Paper component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="send message"
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton className={classes.iconButton} aria-label="search" onClick={() => sendMessage("buscanding")}>
            <SearchIcon />
          </IconButton>
        </Paper>

        </div>);
}

export default Chat;
