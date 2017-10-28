const typeDefs = [`
  type Query {
    game(_id: String): Game
    games: [Game]
    user(_id: String): User
    users: [User]
  }

  type Game {
    _id: String
    coverImage: String
    description: String
    developerIds: [String]
    developers: [User]
    genre: String
    img: String
    macBuild: String
    name: String
    releaseStatus: String
    screenshots: [String]
    tags: [String]
    thumbnail: String
    trailer: String
    windowsBuild: String
  }

  input GameInput {
    coverImage: String
    description: String
    developerIds: [String]
    genre: String
    img: String
    macBuild: String
    name: String
    releaseStatus: String
    screenshots: [String]
    tags: [String]
    thumbnail: String
    trailer: String
    windowsBuild: String
  }

  type User {
    _id: String
    email: String
    gameIds: [String]
    games: [Game]
    password: String
    profilePic: String
    username: String
  }

  type Mutation {
    createGame(game: GameInput): Game
    createUser(email: String, username: String, password: String, gameIds: [String]): User
    setProfilePicture(userId: String, url: String): User
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default typeDefs;
