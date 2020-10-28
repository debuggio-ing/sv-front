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


export { startGame, joinGame, listLobbies, vote }
