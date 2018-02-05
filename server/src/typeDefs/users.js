const users = {
  query: `
    potentialUsers: [PotentialUser]
    user(_id: String): User
    users: [User]
  `,
  types: `
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
  `,
  mutation: `
    addPotentialUser(email: String): PotentialUser
    createUser(email: String, username: String, password: String): User
    setProfilePicture(userId: String, url: String): User
  `
};

export default users;
