"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var typeDefs = ["\n  type Query {\n    game(_id: String): Game\n    games: [Game]\n    user(_id: String): User\n    users: [User]\n  }\n  type Game {\n    _id: String\n    coverImage: String\n    description: String\n    developerIds: [String]\n    developers: [User]\n    genre: String\n    img: String\n    macBuild: String\n    name: String\n    releaseStatus: String\n    screenshots: [String]\n    tags: [String]\n    thumbnail: String\n    trailer: String\n    windowsBuild: String\n  }\n  type User {\n    _id: String\n    email: String\n    gameIds: [String]\n    games: [Game]\n    password: String\n    profilePic: String\n    username: String\n  }\n  type Mutation {\n    createGame(game: Game): Game\n    createUser(email: String, username: String, password: String, gameIds: [String]): User\n    setProfilePicture(userId: String, url: String): User\n  }\n  schema {\n    query: Query\n    mutation: Mutation\n  }\n"];

exports.default = typeDefs;