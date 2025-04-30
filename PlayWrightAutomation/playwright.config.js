// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
   timeout: 30_000 ,  //applicable to every steps  - Global Timeout
   expect: {
    timeout: 7*1000,  //exclusivly for assertion validation  - expect timeout
   },
  //  reporter: 'userInfo',
   reporter: 'html', //
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
    browserName : 'chromium',   //webkit
    headless : false,
    screenshot : 'on',  //take a ss for every automation steps
    trace : 'retain-on-failure', // off/on - give Detailed Report on each and every automation step execution with complete log info.
  },

});

module.exports = config;