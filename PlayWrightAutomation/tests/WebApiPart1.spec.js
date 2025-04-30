const { test, expect, request } = require('@playwright/test');

// Payload for login
const loginPayLoad = {
  userEmail: "rahul111@shetty.com",
  userPassword: "Learning@111"
};
const orderPayLoad = {orders:[{country:"Cuba",productOrderedId:"67a8df56c0d3e6622a297ccd"}]};
let authToken = '';  // Store the token here
let orderId;
test.beforeAll(async () => {
  const apiContext = await request.newContext();
  
  const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
    data: loginPayLoad,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (loginResponse.status() === 200) {
    const loginResponseJson = await loginResponse.json();
    authToken = loginResponseJson.token;  // Extract token
    console.log('Token:', authToken);
  } else {
    throw new Error('Login failed');
  }

  
  const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data : orderPayLoad,
      headers:{
        'Authorization' : authToken,
        'Content-Type' : 'application/json'
      }
    })
    const orderResponseJson = await orderResponse.json();
    console.log(orderResponseJson);
    orderId = orderResponseJson.orders[0];
    
});

test('Make another API request using the token', async () => {
  const apiContext = await request.newContext();

  const response = await apiContext.get('https://rahulshettyacademy.com/api/ecom/other-endpoint', {
    headers: {
      'Authorization': `Bearer ${authToken}`  // Use token for auth
    }
  });

  console.log('Response Status:', response.status());
  const responseBody = await response.text();
  console.log('Response Body:', responseBody);
  expect(response.status()).toBe(200);

});


test.beforeEach(() => {

})

test('Web api testing 45 - 25_3 test', async ({ page }) => {
  // const context = await browser.newContext();
  //   const page = await context.newPage();
    
  page.addInitScript(value =>{
    window.localStorage.setItem('token',value)
  },authToken)
  await page.goto("https://rahulshettyacademy.com/client")
  // await page.goto("https://rahulshettyacademy.com/client");
  // await page.locator("#userEmail").fill("rahul111@shetty.com");
  // await page.locator("#userPassword").fill("Learning@111");
  // await page.locator("#login").click();
  // // await page.locator('.card-body b').first().textContent();
  // await page.waitForLoadState('networkidle');  //wait untill all networks call are successfully made . then only get all text content

  // await page.locator('.card-body b').first().waitFor();  // only working when your Locator returns only single element, nOT HERE FOR MULTI AND ISSUE WHICH TO WAIT FOR.
  // const title = await page.locator(".card-body b").allTextContents();
  // console.log(title);
// await page.pause();

  // const matchProduct = page.locator('.card-body');
  // const productName = 'ADIDAS ORIGINAL';
  // const count = await matchProduct.count();
  // console.log(count);
  // for (let i = 0; i < count; i++) {
  //   if (await matchProduct.nth(i).locator('b').textContent() === productName) {
  //     const AddCartProduct = await matchProduct.nth(i).locator("text = Add To Cart").click();
  //     console.log(AddCartProduct);
  //     break;
  //   }
  // }
  // await page.locator("[routerlink *='cart']").click();
  // await page.locator('div li').first().waitFor();
  // // await page.locator("text =ADIDAS ORIGINAL").click();
  // const boolTitle = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
  // console.log(boolTitle);
  // expect(boolTitle).toBeTruthy();
  // page.locator('button[type="button"]').last().click();


  // page.locator('[placeholder="Select Country"]').pressSequentially('ind');
  // const dropdown = page.locator('.ta-results');
  // await dropdown.waitFor();
  // const countDropdown = await dropdown.locator('button').count();
  // for (let i = 0; i < countDropdown; i++) {
  //   const text = await dropdown.locator('button').nth(i).textContent();
  //   if (text.trim() == 'India') {
  //     await dropdown.locator('button').nth(i).click();
  //     break;
  //   }
  // }
  // await page.pause();

  // await expect(page.locator('.user__name [type="text"]').first()).toHaveText('rahul111@shetty.com');
  // await page.locator('.action__submit').click();
  // await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
  // const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
  // console.log(orderId);
  // await page.pause();
  await page.locator('button[routerlink="/dashboard/myorders"]').click();
  await page.locator('tbody').waitFor();
  const orderCount = await page.locator('tbody tr');
  for (let i = 0; i < await orderCount.count(); i++) {
    const rowOrderId = await orderCount.nth(i).locator('th').textContent();
    if (orderId.includes(rowOrderId)) {
      await orderCount.nth(i).locator('td button').first().click();
      break;
    }
  }
  const orderIdDetails = await page.locator('.col-text').textContent();
  await page.pause();
  expect(orderId.includes(orderIdDetails)).toBeTruthy();

});