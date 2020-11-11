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

const toggleAvailable = {
  type: "TOGGLEAVAILABLE"
}


const toggleStarted = {
  type: "TOGGLESTARTED"
}

const toggleFinished = {
  type: "TOGGLEFINISHED"
}

const toggleOwnGames = {
  type: "TOGGLEOWNGAMES"
}

const actionvote = {
  type: "VOTE"
}

const listProclaim = {
  type: "LIST_PROCLAIM",
  proclams: [] //Donde un proclam es {id: int, phoenix: bool}
}

const listCards = {
  type: "LIST_CARDS",
  cards: [] // [{id: int, phoenix: bool}]
}

const updateGameStatus = {
  type: "UPDATEGAMESTATUS",
  game: {
    current_players: [],
    name: "default",
    director: -1,
    minister: -1,
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

export {
  startGame, joinGame, listLobbies, actionvote, toggleStarted, toggleAvailable,
  toggleFinished, listCards,
  toggleOwnGames, listProclaim, updateLobbyStatus, updateGameStatus, leaveGame
}
