// // // @ts-check
// // import { test, expect } from '@playwright/test';

// // test('has title', async ({ page }) => {
// //   await page.goto('https://playwright.dev/');

// //   // Expect a title "to contain" a substring.
// //   await expect(page).toHaveTitle(/Playwright/);
// // });

// // test('get started link', async ({ page }) => {
// //   await page.goto('https://playwright.dev/');

// //   // Click the get started link.
// //   await page.getByRole('link', { name: 'Get started' }).click();

// //   // Expects page to have a heading with the name of Installation.
// //   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// // });


// test.beforeAll(async () => {
//   console.log('Before tests');

//   // Create a new API context
//   const apiContext = await request.newContext();
  
//   // Make the POST request and await the response
//   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client", {
//     data: loginPayLoad
//   });

//   // Check that the status code is within the 2xx range
//   expect(loginResponse.status()).toBeGreaterThanOrEqual(200);
//   expect(loginResponse.status()).toBeLessThan(300);

//   // Parse the response JSON and extract the token
//   const loginResponseJson = await loginResponse.json();
//   const token = loginResponseJson.token;
//   console.log('Token:', token);
// });


// {
//     const apiContext = await request.newContext();
  
//     // Make the POST request and await the response (await the promise here)
//     const loginResponse = await apiContext.post("https://rahulshettyacademy.com/client/auth/login", {
//       data: loginPayLoad
//     });
  
//     // Check that the status code is within the 2xx range
//     expect(loginResponse.ok()).toBeTruthy();
  
//     // Parse the response JSON and extract the token
//     const loginResponseJson = await loginResponse.json(); // await here because loginResponse is a valid response object
//     const token = loginResponseJson.token;
//     console.log('Token:', token);
//   });