import React from 'react';
import { MessageList, MessageGroup, Message, MessageText, ThemeProvider, Avatar } from '@livechat/ui-kit'
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import { Formik, Field, Form } from 'formik';
import { makeStyles } from '@material-ui/core/styles';

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

function Chat({ sendMessage, messages }) {
    const classes = useStyles();

    return (<div>
        <div style={{ width: '100%', height: 400 }}>
            <ThemeProvider>
                <MessageList active>
                    {messages.map((message, index) => (
                        <MessageGroup avatar='public/img/harry-potter.png'>
                            <Message authorName={message.sender} key={index}>
                                <MessageText key={index}>{message.message}</MessageText>
                            </Message>
                        </MessageGroup>
                    ))}
                </MessageList>
            </ThemeProvider>
        </div>

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
