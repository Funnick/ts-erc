const nextJest = require("next/jest");
const createJestConfig = nextJest({
  dir: "./",
});
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  automock: false,
  resetMocks: false,
  setupFiles: [
      "./setupJest.js"
    ]
};

module.exports = createJestConfig(customJestConfig);