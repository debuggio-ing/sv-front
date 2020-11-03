import React from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar } from '@material-ui/core';

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
