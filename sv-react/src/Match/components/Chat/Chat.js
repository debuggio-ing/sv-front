import React from 'react';
import { TextField, List, ListItem, ListItemAvatar, Avatar, Button } from '@material-ui/core';

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
    return (<div>

        <List className="chatMessages">
          {messages.map((message, index) => (
              <ListItem key={index}>
              <ListItemAvatar key={index}>
              <Avatar alt={message.sender} src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                {message.message}
              </ListItem>
          ))}
        </List>

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
