module.exports = {
  testEnvironment: "node", // Ensures that the test environment is set for Node.js
  testPathIgnorePatterns: ["/node_modules/", "/dist/"], // Ignores these folders
  coverageDirectory: "./coverage/", // If you want Jest to collect test coverage
  collectCoverage: true, // Enables coverage collection
};
