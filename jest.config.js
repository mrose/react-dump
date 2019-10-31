module.exports = {
  verbose: true,
  "moduleNameMapper": {
    "\\.(css|less)$": "<rootDir>/test/__mocks__/styleMock.js",
  },
  "transformIgnorePatterns": [
    "/node_modules/(?!lodash-es).+\\.js$"
  ]
}
