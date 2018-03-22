const games = {
  query: `
    game(_id: String): Game
    games(checkInvisible: Boolean): [Game]
    gamesByTags(tags: [String]): [Game]
  `,
  types: `
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
      playable: String
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
  `,
  mutation: `
    addToMetric(gameId: String, metric: String): Game
    createGame(game: GameInput): Game
    deleteGame(id: String): Game
    editGame(game: GameInput): Game
    removeDeveloperFromGame(id: String, userId: String): Game
    updateGeneralSettings(gameId: String, isPrivate: Boolean, releaseStatus: String): Game
    setStrProperty(gameId: String, propName: String, propValue: String): Game
  `
};

export default games;
