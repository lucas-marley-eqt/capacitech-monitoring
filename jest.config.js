const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./", // caminho do projeto
});

const config = {
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};

module.exports = createJestConfig(config);