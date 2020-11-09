import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemAvatar, Avatar, Card, CardContent, Typography, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  card: {
    width: "100%"
  },
  sidewaysLists:  {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
  },
  listItem: {
    width: "0px"
  },
  avatarColor: {
    backgroundColor: "#12312"
  },
  joinButton: {
    float: "right",
    margin: "10px"
  }
}));

function LobbyCard({lobby, joinGame}) {
    const classes = useStyles();
    return ( 
    <Card className={classes.card}>
      <CardContent className="">
        <Typography gutterBottom variant="h5" component="h2">
          {lobby.name}
        </Typography>
        <List className={classes.sidewaysLists}>
          {lobby.current_players.map((player, index) => (
            <ListItem key={index} className={classes.listItem}>
              <ListItemAvatar>
                
              <Avatar alt={player} src="/static/images/avatar/1.jpg" className={classes.avatarColor} />
              <Typography align="center" gutterBottom variant="body" component="p">
                  {player}
                </Typography>
              </ListItemAvatar>
              
            </ListItem>
          ))}
        </List>
         <Typography align="right" gutterBottom variant="body" component="p">
            ({lobby.current_players.length} / {lobby.max_players})
          </Typography>
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
