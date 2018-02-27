const tests = {
  types: `
    type Test {
      _id: String
      cloudfrontUrl: String
      comments: [JSON]
      objectives: [JSON]
      s3Url: String
      testingSessionId: String
    }

    input testInput {
      cloudfrontUrl: String
      comments: [JSON]
      objectives: [JSON]
      s3Url: String
      testingSessionId: String
    }
  `,
  mutation: `
    createTest(test: testInput): Test
  `
};

export default tests;
