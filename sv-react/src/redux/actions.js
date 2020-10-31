const startGame = {
  type: "START"
};

const leaveGame = {
  type: "LEAVE"
};

const joinGame = {
  type: "JOIN",
  lobby: { name: "def" }
};


const listLobbies = {
  type: "LISTLOBBIES",
  lobbies: []
}

const vote = {
  type: "VOTE"
}

const updateGameStatus = {
  type: "UPDATEGAMESTATUS",
  game: {
    current_players: [],
    name: "default",
    id: -1
  }
}

const updateLobbyStatus = {
  type: "UPDATELOBBYSTATUS",
  lobby: {
    current_players: [],
    name: "default",
    id: -1
  }
}

export { startGame, joinGame, listLobbies, vote, updateLobbyStatus, updateGameStatus, leaveGame }
