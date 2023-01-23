module.exports = async () => {
  return {
    extensionsToTreatAsEsm: ['.ts'],
    verbose: true,
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    transform: {
      '^.+\\.(ts|tsx)?$': ['ts-jest', { useESM: true }],
    },
    modulePathIgnorePatterns: ['tests'],
  };
};
