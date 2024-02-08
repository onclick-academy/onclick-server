module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@validation/(.*)$': '<rootDir>/src/middlewares/validation/$1',
    '^@models/(.*)$': '<rootDir>/src/models/$1',
    '^@dao/(.*)$': '<rootDir>/src/models/dao/$1',
    '^@dto/(.*)$': '<rootDir>/src/models/dto/$1',
    '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    '^@utilities/(.*)$': '<rootDir>/src/utilities/$1',
    '^@types/(.*)$': '<rootDir>/src/types/$1'
    // Add other path aliases here if needed
  },
  // If you have specific configurations for ts-jest, you can add them here
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json' // Adjust the path as necessary
    }
  }
}
