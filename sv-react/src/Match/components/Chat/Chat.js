import React, {useEffect, useRef} from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar, Button, Paper } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { Formik, Field, Form } from 'formik';

const useStyles = makeStyles((theme) => ({
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    width: '70%',
  },
  iconButton: {
    padding: 10,
  },
}));

function Chat({sendMessage, key, messages}) {
    const classes = useStyles();

    const messagesEndRef = useRef(null)
    const messageScroll = useRef(null)

    const scrollToBottom = () => {
      var height = document.getElementById("messagesContainer").scrollHeight;

      if (messageScroll.current.scrollTop > height - 500){
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
      }
    }

    useEffect(scrollToBottom, [messages]);

    return (<div>
        <Paper ref={messageScroll} id="messagesContainer" style={{maxHeight: 400, overflow: 'auto'}}>
            {messages.map((message, index) => (
                <ListItem key={index}>
                <ListItemAvatar key={index}>
                <Avatar alt={message.sender} src="/static/images/avatar/1.jpg" />
                  </ListItemAvatar>
                  {message.message}
                </ListItem>
            ))}
            <div ref={messagesEndRef} />
        </Paper>

        <Formik
          initialValues={{
              message: '',
          }}
          onSubmit={(values, {resetForm}) => {
              sendMessage(values.message);
              resetForm({message: ''})
          }}>
            { formProps =>  (
                <Form onSubmit={formProps.handleSubmit}>
                  <Field name="message"
                         type="text"
                         className={classes.input}
                         value={formProps.values.message}/>
                  <IconButton className={classes.iconButton} type="submit">
                    <SendIcon />
                  </IconButton>
                </Form>
            )}
        </Formik>
        </div>);
}

export default Chat;
