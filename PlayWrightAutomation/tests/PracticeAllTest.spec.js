// const {test, expect} = require('@playwright/test');
const { test, expect, request } = require('@playwright/test');
const { json } = require('stream/consumers');


test('1st test__ 11', async ({browser,page})=>{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    const username = page.locator('#username');
    const password = page.locator('#password');

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill('rahulshettyacademy')
    await password.fill('Password')
    await page.locator('[type="submit"]').click()
    const text = await page.locator('[style*="block"]').textContent();
    // await expect(page.locator()).toBeTruthy();
    console.log(text);
    // expect(text).toBeTruthy()
await expect(page.locator('[style*="block"]')).toContainText('Incorrect');

    await page.locator('#password').fill("");
    await username.fill("rahulshettyacademy");
    await password.fill('learning');
    await page.locator('[type="submit"]').click();
    console.log(await page.locator('.card-title').nth(1).textContent());
console.log(await page.locator('.card-title a').allTextContents());

    const productName = 'Samsung Note 8';
    const matchProduct = page.locator('app-card')
    const count = await matchProduct.count();
    console.log(count);
    await page.pause();

     for(let i= 0; i<count; i++)
     {
        if(await matchProduct.nth(i).locator('.card-title a').textContent() == productName)
        {
            await matchProduct.nth(i).locator('.btn-info').click();
            await page.locator('.btn-primary').click();
            console.log('match...',i);
            break;
        }
        console.log('not match...', i);
     }
    await page.pause();

})

test('14_Test 2 ', async ({page})=>{
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator("#userEmail").fill("rahul111@shetty.com");
    await page.locator("#userPassword").fill("Learning@111");
    await page.locator("#login").click();

await page.waitForLoadState('networkidle');
    // await page.locator('.card-body b').first().waitFor();  // only working when your Locator returns only single element, nOT HERE FOR MULTI AND ISSUE WHICH TO WAIT FOR.
    const title = await page.locator(".card-body b").allTextContents();
    console.log(title);

    const matchProduct = page.locator('.card-body');
    const productName = 'ADIDAS ORIGINAL';
    const count = await matchProduct.count();
    console.log(count);
    for(let i = 0; i< count; i++){
        if(await matchProduct.nth(i).locator('b').textContent() == productName)
        {
            // await matchProduct.nth(i).locator('button').last().click();
            const AddCartProduct = await matchProduct.nth(i).locator("text = Add To Cart").click();
            console.log(AddCartProduct,'matched..');
            break;
        }
        console.log('not matched..');
    }
await page.locator('[routerlink="/dashboard/cart"]').click()
await page.locator('div li').first().waitFor();
    // await page.locator("text =ADIDAS ORIGINAL").click();
const boolTitle = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
    console.log(boolTitle);
    expect(boolTitle).toBeTruthy();
    // page.locator('button[type="button"]').last().click();
    await page.locator('button',{hasText: 'Checkout'}).click();
        // await page.pause();
await page.locator('[placeholder="Select Country"]').pressSequentially('ind');
    const dropdown=  page.locator('.ta-results');
await dropdown.waitFor();
    const countDropdown = await dropdown.locator('button').count();
    for(let i=0;i<countDropdown;i++){
    const text = await dropdown.locator('button').nth(i).textContent();
        if(text.trim() == 'India')
        {
            await dropdown.locator('button').nth(i).click();
            console.log('Matched...');
            break;
        }
    }

    // await expect( page.locator('.user__name [type="text]').first()).toHaveText('rahul111@shetty.com');
await expect(page.locator('.user__name [type="text"]').first()).toHaveText('rahul111@shetty.com');
await page.locator('[routerlink="/dashboard/myorders"]').first().click();
    // await page.locator('.action__submit').click();
    await page.pause();

    })

    test('15_Client App', async({page}) =>{
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator('#userEmail').fill('rahul111@shetty.com');
        await page.locator('#userPassword').fill('Learning@111');
        await page.locator('#login').click();
await page.waitForLoadState('networkidle');  //wait untill all networks call are successfully made . then only get all text content
        // const title = await page.locator('.card-body b').first().waitFor();      // only working when your Locator returns only single element, nOT HERE FOR MULTI AND ISSUE WHICH TO WAIT FOR.
        const title = await page.locator('.card-body b').allTextContents();
        console.log(title);

        const proName = 'ADIDAS ORIGINAL';
        const matchProd = page.locator('.card-body');
        const count = await matchProd.count();
        console.log(count);
        for(let i = 0 ; i< count; i++)
        {
            if(await matchProd.nth(i).locator('b').textContent()== proName)
            {
                // await matchProd.nth(i).locator('button i').last().click();
    await matchProd.nth(i).locator('text = Add To Cart').last().click();  // '[text = " Add To Cart"]' not working
                console.log('yeaaa');
                break;

            }
        }
        console.log('Nooo');
        await page.locator('[routerlink="/dashboard/cart"]').click();           //  "[routerlink *='cart']"
        // await page.locator("[routerlink *='cart']").click();
        // await page.pause();
        await page.locator('div li').first().waitFor();
        const boolTit = await page.locator("text =ADIDAS ORIGINAL").isVisible();
// const boolTit = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
        console.log(boolTit);
        expect(boolTit).toBeTruthy();
        await page.locator('text = Checkout').click();

        await page.locator("[placeholder='Select Country']").pressSequentially('India');
        const dropdwn = page.locator('.ta-results');
await dropdwn.waitFor();
        const countDropdwn = await dropdwn.locator('button').count();
        for(let i=0; i<countDropdwn;i++)
        {
            const txt = await dropdwn.locator('button').nth(i).textContent();
            if(txt.trim() == 'India'){
                await dropdwn.locator('button').nth(i).click();
                console.log('clicked..');
                break;
            }
        }
        await page.pause();

        await expect(page.locator(".user__name [type = 'text']").first()).toHaveText('rahul111@shetty.com')
        await page.locator('.action__submit').click();
        await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
        const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
        console.log(orderId);
        await page.locator('button[routerlink="/dashboard/myorders"]').click();
        // await page.locator('.table-bordered').waitFor();
        await page.locator('tbody').waitFor();
        const orderCount = await page.locator('tbody tr');
        const ttlOrderCount = await orderCount.count();
        console.log(ttlOrderCount);


        for(let i=0; i< ttlOrderCount; i++)
        {
    const rowOrderId = await orderCount.nth(i).locator('th').textContent();
            // if(await orderCount.nth(i).locator('th').textContent() == orderId)
            if(orderId.includes(rowOrderId))
            {
                // await page.pause();
                await orderCount.nth(i).locator('td button').first().click();
                break;
            }
        }
        const orderIdDetls = await page.locator('.col-text').textContent();
        expect(orderId.includes(orderIdDetls)).toBeTruthy();
        console.log("Thank You...!!");

        await page.pause();
    })

    test('17_loginPagePractice_Child20', async({page})=>{
        // customradio
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  //goto - to land on that page
        await page.locator('#username').fill("rahulshettyacademy"); // Correct username
    await page.locator("[type='password']").fill("learning"); // Correct password
    await page.pause();
    await page.locator('Select.form-control').selectOption('consult');

    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();

        await page.pause();
    })

    test('20_Child Handling window', async ({browser})=>{
        const context = await browser.newContext();
        const page = await context.newPage();

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      await page.pause();
        const documentLink = await page.locator("[href*= 'documents-request']");
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            documentLink.click()
        ])
        const text = await newPage.locator('.red').textContent();
        const ArraySplit = text.split('@');
        const splitText = ArraySplit[1].split(" ")[0]
        console.log(splitText);

        const ttl = await page.locator('#username').fill(splitText);
        console.log(ttl);

        await newPage.pause();

    })

    test('26_/Client App Login', async ({page})=>{
        await page.goto('https://rahulshettyacademy.com/client');
        await page.locator("#userEmail").fill("rahul111@shetty.com");
await page.locator("#userPassword").fill("Learning@111");
await page.locator("#login").click();
await page.waitForLoadState('networkidle');
const cardCount = await page.locator('.card-body').allTextContents();
console.log(cardCount);

const matchProd =  page.locator('.card-body')
const prodName = 'IPHONE 13 PRO';
const count = await matchProd.count();
console.log(count);
// await page.pause();
for(let i=0; i<count; i++){
   if(await matchProd.nth(i).locator('h5 b').textContent() == prodName)
    {
        const AddCartProd = await matchProd.nth(i).locator("text= Add To Cart").click();
        console.log(AddCartProd);
        break;
    }
}
await page.locator('[routerlink="/dashboard/cart"]').click();
await page.locator('.cart ul li').first().waitFor();
const boolTitle = await page.locator("h3:has-text('IPHONE 13 PRO')").isVisible();
console.log(boolTitle);
await page.locator('text ="Buy Now"').click();
// await page.locator('.cartSection button').click();
await page.pause();

page.locator('[placeholder="Select Country"]').pressSequentially('Ind');
const dd = page.locator('.ta-results');
await dd.waitFor();
const ddItem = await page.locator('.ta-item').count();
console.log(ddItem);
for(let i=0; i<ddItem;i++)
{
    const textdd= await dd.locator('button').nth(i).textContent();
    if(textdd.trim() == 'India')
    {
        await dd.locator('button').nth(i).click();
        console.log('India clicked..');
        break;
    }
}
await page.locator('.action__submit').click();
// .user__name label[type="text"]
await expect(page.locator('.user__name [type="text"]').first()).toHaveText('rahul111@shetty.com');      //.user__name label[type="text"]
await page.pause();

})

test('33_getBY Lable', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
// await page.pause();
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByPlaceholder('Password').fill('Learning@111');
    await page.getByLabel('Gender').selectOption('Male');
    // await page.getByLabel('Email').fill('rahul111@shetty.com');
    await page.getByLabel('Gender').selectOption('Female');

    // await page.locator('#exampleCheck1').check();
    await page.getByRole('checkbox', { name: 'Check me out if you Love IceCreams!' }).check();
    await page.getByRole('checkbox', { name: 'Check me out if you Love IceCreams!' }).uncheck();
    expect(await page.getByRole('checkbox', { name: 'Check me out if you Love IceCreams!' }).isChecked()).toBeFalsy();

// await page.getByRole('textbox', { name: 'Email' }).fill('rahul111@shetty.com');
await page.locator('.ng-valid').first().fill('rahul111@shetty.com');
await page.pause();
})

test('39 Calender ',async({page})=>{



    const year = '2027';
    const date = "18";
    const monthNum = '4';
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    // await page.locator('.react-date-picker__calendar-button react-date-picker__button').click();
    // await page.locator('.react-date-picker__inputGroup__input react-date-picker__inputGroup__year').click();
    await page.locator(".react-date-picker__inputGroup").click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    await page.locator('.react-calendar__navigation__label__labelText').click();
    // await page.locator('react-calendar__tile')
    await page.getByText(year).click();
    await page.locator('.react-calendar__year-view__months__month').nth(Number(monthNum)-1).click();
    // react-date-picker--closed
    await page.locator("//abbr[text()='"+date+"']").click();
await page.pause();

})



// ***  45_Web api token testing  ***


// Payload for login
const loginPayLoad = {
  userEmail: "rahul111@shetty.com",
  userPassword: "Learning@111"
};
const orderPayLoad = {orders: [{country: "India", productOrderedId: "67a8df1ac0d3e6622a297ccb"}]}
let token ='';
let orderId;
 
test.beforeAll(async () => {
    const apiContext = await request.newContext();
   
    // Make the POST request
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
      data: loginPayLoad,
      headers: {
        'Content-Type': 'application/json'
      }
    });
   
    // Log the response status code to check if it's successful
    console.log('Response Status:', loginResponse.status());
   
    // Log the response body to see if it's HTML or JSON
    const responseText = await loginResponse.text();
    console.log('Response Body:', responseText);
   
    // Check if the response status is OK (200) before attempting to parse JSON
    if (loginResponse.ok()) {
      try {
        // Attempt to parse the response body as JSON
        const loginResponseJson = JSON.parse(responseText); // Parse manually if you know it's JSON
        token = loginResponseJson.token;
        console.log('Token:', token);
      } catch (err) {
        console.error('Error parsing response as JSON:', err);
      }
    } else {
      console.error('Failed to log in, received non-200 response');
    }

//49 - end to End Validation

const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
    data: orderPayLoad,
    headers: {
        'Authorization': token,
        'content-type': 'application/json',
    }
});

    const orderResponseJson = await orderResponse.json();
    // const orderResponseJson = await json.parse(orderResponse);
        console.log(orderResponseJson);
        orderId = orderResponseJson.orders[0];
   
  });

//   if (loginResponse.status() === 200) {
//     const loginResponseJson = await loginResponse.json();
//     authToken = loginResponseJson.token;  // Extract token
//     console.log('Token:', authToken);
//   } else {
//     throw new Error('Login failed');
//   }
// });

test.beforeEach(() => {
 
})
// test.beforeAll(async () => {
//   const apiContext = await request.newContext();
  
//   const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
//     data: loginPayLoad,
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   });

//   if (loginResponse.status() === 200) {
//     const loginResponseJson = await loginResponse.json();
//     authToken = loginResponseJson.token;  // Extract token
//     console.log('Token:', authToken);
//   } else {
//     throw new Error('Login failed');
//   }

  
// //   const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
// //     {
// //       data : orderPayLoad,
// //       headers:{
// //         'Authorization' : authToken,
// //         'Content-Type' : 'application/json'
// //       }
// //     })
//     // const orderResponseJson = await orderResponse.json();
//     // console.log(orderResponseJson);
//     // orderId = orderResponseJson.orders[0];
    
// });
    
test.only('45_Web api token testing', async ({ page }) => {

    page.addInitScript(val=>{
        window.localStorage.setItem('token',val)  //key:val pair
    },token)
    await page.goto("https://rahulshettyacademy.com/client");
    // await page.locator("#userEmail").fill("rahul111@shetty.com");
    // await page.locator("#userPassword").fill("Learning@111");
    // await page.locator("#login").click();
    
// await page.waitForLoadState('networkidle');  //wait untill all networks call are successfully made . then only get all text content
    // await page.locator('.card-body b').first().textContent();
// await page.locator('.card-body b').first().waitFor();  // only working when your Locator returns only single element, nOT HERE FOR MULTI AND ISSUE WHICH TO WAIT FOR.
   
    // await page.pause();
    await page.locator('button[routerlink="/dashboard/myorders"]').click();
    await page.locator('tbody').waitFor();
    const orderCount = await page.locator('tbody tr');
    for(let  i=0; i<await orderCount.count(); i++){
        const rowOrderId = await orderCount.nth(i).locator('th').textContent();
        if(orderId.includes(rowOrderId)){
            await orderCount.nth(i).locator('td button').first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator('.col-text').textContent();
    await page.pause();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    
})


