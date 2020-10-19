import React from 'react';
import { Input, TextField, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const messages = [
    {
        "text": "Que onda muchcahos",
        "from": "Primer Jugador"
    },
    {
        "text": "Callate",
        "from": "Segundo Jugador"
    }
]

function Chat() {
    const classes = useStyles();
    return <div>
        <List className="chatMessages">
          {messages.map((message) => (
              <ListItem >
              <ListItemAvatar>
              <Avatar alt={message.from} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                {message.text}
              </ListItem>
          ))}
        </List>
        <TextField id="chat-write" className="chatInput" label="Escribir" />
        </div>
}

export default Chat;
