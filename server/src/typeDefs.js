import Json from 'graphql-type-json'; // eslint-disable-line

const typeDefs = [`
  scalar JSON

  type Query {
    game(_id: String): Game
    games(checkInvisible: Boolean): [Game]
    gamesByTags(tags: [String]): [Game]
    potentialUsers: [PotentialUser]
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
    invisible: Boolean
    isPrivate: Boolean
    languages: [String]
    macBuild: String
    ownerId: String
    pageViews: Int
    plays: Int
    publisher: String
    releaseStatus: String
    screenshots: [String]
    shortDescription: String
    spaceRequired: String
    tags: [String]
    testingSessions: [TestingSession]
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
    invisible: Boolean
    languages: [String]
    macBuild: String
    ownerId: String
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

  type TestingSession {
    _id: String
    endDate: String
    game: String
    maxTesters: Int
    rewardType: String
    reward: String
    startDate: String
    testers: [User]

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

  type PotentialUser {
    _id: String
    email: String
  }

  type Mutation {
    createGame(game: GameInput): Game
    editGame(game: GameInput): Game
    createUser(email: String, username: String, password: String): User
    setProfilePicture(userId: String, url: String): User
    addToMetric(gameId: String, metric: String): Game
    updateGeneralSettings(gameId: String, isPrivate: Boolean, releaseStatus: String): Game
    removeDeveloperFromGame(id: String, userId: String): Game
    deleteGame(id: String): Game
    addPotentialUser(email: String): PotentialUser
  }

  schema {
    query: Query
    mutation: Mutation
  }
`];

export default typeDefs;
