const testingSessions = {
  types: `
    type TestingSession {
      _id: String
      createdAt: String
      endDate: String
      game: String
      maxTesters: Int
      rewardType: String
      reward: String
      startDate: String
      testers: [User]
      testerIds: [String]
    }

    input TSInput {
      endDate: String
      game: String
      maxTesters: Int
      rewardType: String
      reward: String
      startDate: String
    }
  `,
  mutation: `
    createTestingSession(session: TSInput): TestingSession
  `
};

export default testingSessions;
