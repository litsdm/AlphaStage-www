const tests = {
  query: `
    application(_id: String): Application
    applications(): [Application]
  `,
  types: `
    type Application {
      _id: String
      additionalInfo: String
      createdAt: String
      links: [String]
      reasons: [String]
      status: String
    }

    input ApplicationInput {
      additionalInfo: String
      links: [String]
    }
  `,
  mutation: `
    createApplication(application: ApplicationInput): Application
  `
};

export default tests;
