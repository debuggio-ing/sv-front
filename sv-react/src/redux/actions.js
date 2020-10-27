const startGame = {
  type: "START"
};

const joinGame = {
  type: "JOIN",
  id: 0
};


const listLobbies = {
  type: "LISTLOBBIES",
  lobbies: []
}

const vote = {
  type: "VOTE"
}


export { startGame, joinGame, listLobbies, vote }
