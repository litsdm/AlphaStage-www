const tests = {
  types: `
    type Test {
      _id: String
      comments: [JSON]
      objectives: [JSON]
      s3Url: String
      testingSessionId: String
      testerId: String
    }

    input TestInput {
      comments: [JSON]
      objectives: [JSON]
      s3Url: String
      testingSessionId: String
      testerId: String
    }
  `,
  mutation: `
    createTest(test: TestInput): Test
  `
};

export default tests;
