module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom-fifteen',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'ts',
    // tell Jest to handle *.vue files
    'vue'
  ],
  transform: {
    // process *.vue files with vue-jest
    '^.+\\.vue$': require.resolve('vue-jest'),
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
    require.resolve('jest-transform-stub'),
    '^.+\\.jsx?$': 'babel-jest'
  },
  snapshotSerializers: ['jest-serializer-vue'],
  setupFiles: ['dotenv/config', '<rootDir>/jest.init.js'],
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'lcov', 'text'],
  coverageThreshold: {
    global: {
      branches: 35,
      functions: 35,
      lines: 55,
      statements: 35
    }
  }
}
