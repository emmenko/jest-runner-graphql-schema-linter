module.exports = {
  runner: "./src/index.js",
  displayName: "lint:gql",
  moduleFileExtensions: ["gql", "graphql"],
  testMatch: ["**/*.gql", "**/*.graphql"],
  testPathIgnorePatterns: ["/node_modules/", "/src/fixtures/"]
};
