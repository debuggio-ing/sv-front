import React from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar, Button } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { Formik, Field, Form } from 'formik';

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
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '85%',
  },
  iconButton: {
    padding: 10,
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

        <Formik
          initialValues={{
              mensaje: '',
          }}
          onSubmit={({ mensaje }) => {
              sendMessage(mensaje);
          }}
          render={() => (
              <Form>
                <Field name="mensaje" type="text" className={classes.input} />
                <IconButton className={classes.iconButton} type="submit">
                  <SendIcon />
                </IconButton>
              </Form>
          )}
        />
        </div>);
}

export default Chat;
