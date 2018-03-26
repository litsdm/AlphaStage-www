const testingSessions = {
  types: `
    type TestingSession {
      _id: String
      createdAt: String
      endDate: String
      game: String
      maxTesters: Int
      name: String
      objectives: [String]
      plan: String
      startDate: String
      testers: [User]
      testerIds: [String]
      tests: [Test]
    }

    input TSInput {
      endDate: String
      game: String
      name: String
      objectives: [String]
      plan: String
      startDate: String
    }
  `,
  mutation: `
    createTestingSession(session: TSInput): TestingSession
  `
};

export default testingSessions;
