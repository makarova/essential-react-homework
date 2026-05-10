module.exports = {
  preset: 'jest-expo',
  testEnvironment: 'jsdom',
  watchman: false,
  moduleNameMapper: {
    '^@expo/vector-icons$': '<rootDir>/test/mocks/expoVectorIcons.js',
  },
};
