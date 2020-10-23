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

function MatchCard({match}) {
    const classes = useStyles();
    return (
    <Card className={classes.card}>
      <CardContent className="">
        <Typography gutterBottom variant="h5" component="h2">
          {match.name}
        </Typography>
        <List className={classes.sidewaysLists}>
          {match.players.map((player) => (
            <ListItem className={classes.listItem}>
              <ListItemAvatar>
              <Avatar alt={player.nickname} src="/static/images/avatar/1.jpg" className={classes.avatarColor} />
              </ListItemAvatar>
            </ListItem>
          ))}
        </List>
        {!match.playing
          ? <Button className={classes.joinButton} variant="contained" color="primary">
              Unirse
            </Button>
          : <div/>}
      </CardContent>
    </Card>
    )
}

export default MatchCard;
