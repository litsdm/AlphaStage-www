import Json from 'graphql-type-json';

const typeDefs = [`
  scalar JSON

  type Query {
    game(_id: String): Game
    games: [Game]
    user(_id: String): User
    users: [User]
  }

  type Game {
    _id: String
    buildsId: String
    coverImage: String
    descriptionState: JSON
    developerIds: [String]
    developers: [User]
    downloads: Int
    genre: String
    languages: [String]
    macBuild: String
    pageViews: Int
    plays: Int
    publisher: String
    releaseStatus: String
    screenshots: [String]
    shortDescription: String
    spaceRequired: String
    tags: [String]
    title: String
    thumbnail: String
    trailer: String
    uninstalls: Int
    website: String
    windowsBuild: String
  }

  input GameInput {
    _id: String
    buildsId: String
    coverImage: String
    descriptionState: JSON
    developerIds: [String]
    genre: String
    languages: [String]
    macBuild: String
    publisher: String
    releaseStatus: String
    screenshots: [String]
    shortDescription: String
    spaceRequired: String
    tags: [String]
    title: String
    thumbnail: String
    trailer: String
    website: String
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
    editGame(game: GameInput): Game
    createUser(email: String, username: String, password: String): User
    setProfilePicture(userId: String, url: String): User
    addToMetric(gameId: String, metric: String): Game
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default typeDefs;
