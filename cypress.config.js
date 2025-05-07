const { defineConfig } = require('cypress');

module.exports = defineConfig({

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },

  video: true,             
  // folder where videos are saved
  videosFolder: "cypress/videos", 

  specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",

  // Reload the browser between tests to ensure isolation.
  trashAssetsBeforeRuns: true,
  
  // Each test starts with a clean state.
  numTestsKeptInMemory: 0,

  // Disable taking screenshots in case of an error.
  screenshotOnRunFailure: false,

  retries: {
    runMode: 10,
    openMode: 1,
  },

  },
});


