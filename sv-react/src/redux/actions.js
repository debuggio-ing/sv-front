const startGame = {
  type: "START"
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

const gameStatus = {
  type: "UPDATEGAMESTATUS",
  currentGame: {
    current_players: [],
    name: "default",
    id: -1
  }
}


export { startGame, joinGame, listLobbies, vote, gameStatus }
