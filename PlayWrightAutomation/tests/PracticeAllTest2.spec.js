// const {test, expect} = require('@playwright/test');
const { test, expect, request } = require('@playwright/test');
const { json } = require('stream/consumers');
const { APIUtils } = require('./utils/ApiUtils');

// ***  45_Web api token testing  ***
// Payload for login
const loginPayLoad = {
  userEmail: "rahul111@shetty.com",
  userPassword: "Learning@111"
};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]}
let token ='';
let orderId;
let response;
test.beforeAll(async () => {
    const apiContext = await request.newContext();
   const apiUtils = new APIUtils(apiContext,loginPayLoad);
    response = await apiUtils.createOrder(orderPayLoad)
    // Make the POST request
   
//49 - end to End Validation
   
  });

test.beforeEach(() => {
 
})
    
test.only('45_Web api token testing', async ({ page }) => {
    
    page.addInitScript(val=>{
        window.localStorage.setItem('token',val)  //key:val pair
    },response.token)
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.pause();
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();
    const orderCount = await page.locator('tbody tr');
    for(let  i=0; i<await orderCount.count(); i++){
        const rowOrderId = await orderCount.nth(i).locator('th').textContent();
        if(response.orderId.includes(rowOrderId)){
            await orderCount.nth(i).locator('td button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    
})