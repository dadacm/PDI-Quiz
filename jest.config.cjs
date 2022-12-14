// require('dotenv').config();

module.exports = {
  transform: {
    '^.+\\.(ts?|jsx?|tsx?)?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.jest.json',
      diagnostics: false,
    },
  },
  setupFilesAfterEnv: ['./src/utils/JestLocalStorage.ts', './jest.setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/src/styles/', '/cypress/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['<rootDir>/src/styles/', '<rootDir>/src/utils/', '<rootDir>/cypress'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/fileMock.js',
    '@utils(.*)$': '<rootDir>/src/utils/$1',
    '@styles(.*)$': '<rootDir>/src/styles/$1',
    '@components(.*)$': '<rootDir>/src/components/$1',
    '@services(.*)$': '<rootDir>/services/$1',
    '@routes(.*)$': '<rootDir>/src/routes/$1',
    '@pages(.*)$': '<rootDir>/src/pages/$1',
    '@context(.*)$': '<rootDir>/src/context/$1',
    '@global.types': '<rootDir>/src/global.types.ts',
    'react-hook-form-next': '<rootDir>/node_modules/react-hook-form-v7',
  },
  moduleDirectories: ['node_modules', 'src'],
};
