const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },
};

export default config;
