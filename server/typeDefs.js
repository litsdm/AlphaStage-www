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
    img: String
    name: String
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
    createGame(name: String, description: String, img: String, coverImage: String, developerIds: [String]): Game
    createUser(email: String, username: String, password: String, gameIds: [String]): User
    setProfilePicture(userId: String, url: String): User
  }
  schema {
    query: Query
    mutation: Mutation
  }
`];

export default typeDefs;
