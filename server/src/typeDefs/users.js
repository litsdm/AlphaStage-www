const users = {
  query: `
    potentialUsers: [PotentialUser]
    user(_id: String): User
    users: [User]
    scoreboardUsers: [User]
  `,
  types: `
    type User {
      _id: String
      email: String
      experience: Int
      gameIds: [String]
      games: [Game]
      highScore: Int
      level: Int
      nextLevelExp: Int
      password: String
      profilePic: String
      username: String
    }

    type PotentialUser {
      _id: String
      email: String
    }

    input LevelInput {
      _id: String,
      exp: Int,
      level: Int,
      currentExp: Int
    }
  `,
  mutation: `
    addExp(input: LevelInput): User
    addPotentialUser(email: String): PotentialUser
    createUser(email: String, username: String, password: String): User
    setProfilePicture(userId: String, url: String): User
    setHighScore(_id: String, highScore: Int): User
  `
};

export default users;
