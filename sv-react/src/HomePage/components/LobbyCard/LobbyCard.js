import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, List, ListItem, ListItemAvatar, Avatar, Card, CardContent, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%"
  },
  sidewaysLists: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(2),
    },
    flexDirection: 'row',
    padding: 0,
  },
  listItem: {
    width: "10px"
  },
  avatarColor: {
    backgroundColor: "#12312"
  },
  joinButton: {
    float: "right",
    margin: "10px"
  }
}));

function LobbyCard({ lobby, joinGame }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardContent className="">
        <Typography gutterbottom="true" variant="h5" component="h2">
          {lobby.name}
        </Typography>
        <List className={classes.sidewaysLists}>
          {lobby.current_players.map((player, index) => (
            <ListItem key={index} className={classes.listItem}>
              <li>
                <Avatar alt={player} src="/static/images/avatar/1.jpg" className={classes.avatarColor} />
                <Typography align="center" gutterbottom="true" variant="body1" component="p">
                  {player}
                </Typography>
              </li>
            </ListItem>
          ))}
        </List>

        {lobby.finished
          ? <Box align="right" gutterbottom="true" variant="body1" component="p" fontFamily="Segoe UI Emoji">
            Finished
          </Box>
          : <Box align="right" gutterbottom="true" variant="body1" component="p" fontFamily="Segoe UI Emoji">

          </Box>}
        { lobby.started
          ? <Box align="right" gutterbottom="true" variant="body1" component="p" fontFamily="Segoe UI Emoji">
            Started
          </Box>
          : <Box align="right" gutterbottom="true" variant="body1" component="p" fontFamily="Segoe UI Emoji">
            Not Started
          </Box>}

        <Box align="right" gutterbottom="true" variant="body1" component="p" fontFamily="Segoe UI Emoji">
          ({lobby.current_players.length} / {lobby.max_players})
          </Box>
        <Button className={classes.joinButton} variant="contained" color="primary"
          onClick={() => joinGame(lobby.id)}>
          Unirse
            </Button>

      </CardContent>
    </Card>
  )
}
//Aca debería ir el "Spectate"

export default LobbyCard;
