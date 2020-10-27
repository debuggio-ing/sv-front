import React from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';

const messages = [
    {
        "text": "Que onda muchcahos",
        "from": "Maw"
    },
    {
        "text": "Callate",
        "from": "Lau"
    }
]

function Chat(key) {
    return <div>
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
        <TextField id="chat-write" className="chatInput" label="Escribir" />
        </div>
}

export default Chat;
