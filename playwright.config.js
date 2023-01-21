const config = {
  testDir: './tests',
  testMatch: '**/*.spec.js',
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    baseURL: 'http://localhost:8787',
  },
  webServer: {
    command: 'npm run serve',
    url: 'http://localhost:8787',
  },
};

export default config;
