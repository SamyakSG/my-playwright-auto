// https://rahulshettyacademy.com/client/
// Rahul  shetty
// rahul111@shetty.com
// Phone num =- 1111111111
// occupaton - student
// Gender - Male 
// Learning@111

const {test,expect} = require('@playwright/test');



// test('@Webst Client App login', async ({ page }) => {
//     //js file- Login js, DashboardPage
//     const email = "anshika@gmail.com";
//     const productName = 'ZARA COAT 3';
//     const products = page.locator(".card-body");
//     await page.goto("https://rahulshettyacademy.com/client");
//     await page.getByPlaceholder("email@example.com").fill(email);
//     await page.getByPlaceholder("enter your passsword").fill("Iamking@000");
//     await page.getByRole('button',{name:"Login"}).click();
//     await page.waitForLoadState('networkidle');
//     await page.locator(".card-body b").first().waitFor();
    
//     await page.locator(".card-body").filter({hasText:"ZARA COAT 3"})
//     .getByRole("button",{name:"Add to Cart"}).click();
  
//     await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();
  
//     //await page.pause();
//     await page.locator("div li").first().waitFor();
//     await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  
//     await page.getByRole("button",{name :"Checkout"}).click();
  
//     await page.getByPlaceholder("Select Country").pressSequentially("ind");
  
//     await page.getByRole("button",{name :"India"}).nth(1).click();
//     await page.getByText("PLACE ORDER").click();
  
//     await expect(page.getByText("Thankyou for the order.")).toBeVisible();
//  })

 
test('Client App Login - Validation App - Test practise', async ({page}) =>{
    // const context = await browser.newContext();
    // const page = await context.newPage();
    // await page.goto("https://rahulshettyacademy.com/client");
    // console.log(await page.title());
    // await page.locator("[type='firstName']").fill('User');
    // await page.locator("[type = 'lastName']").fill('Test');
    // await page.locator("#userEmail").fill('user@123.com');
    // await page.locator("#userMobile").fill('123123123');
    // await page.locator(".ng-star-inserted").fill('Student');
    // await page.locator("[value='Male']").fill('Male');
    // await page.locator("#userPassword").fill('Learning@111');
    // await page.locator("#confirmPassword").fill('Learning@11');
    // await page.locator("[value='Register']").click();

    await page.goto("https://rahulshettyacademy.com/client");
await page.locator("#userEmail").fill("rahul111@shetty.com");
await page.locator("#userPassword").fill("Learning@111");
await page.locator("#login").click();
// await page.locator('.card-body b').first().textContent();
await page.waitForLoadState('networkidle');  //wait untill all networks call are successfully made . then only get all text content
// await page.locator('.card-body b').first().waitFor();  // only working when your Locator returns only single element, nOT HERE FOR MULTI AND ISSUE WHICH TO WAIT FOR.
const title = await page.locator(".card-body b").allTextContents();
console.log(title);
// await page.pause();

const matchProduct = page.locator('.card-body');
const productName = 'ADIDAS ORIGINAL';
const count = await matchProduct.count();
console.log(count);
for(let i = 0; i< count; i++)
{
    if(await matchProduct.nth(i).locator('b').textContent() === productName){
        const AddCartProduct = await matchProduct.nth(i).locator("text = Add To Cart").click();
        console.log(AddCartProduct);
        break;
    }
}
await page.locator("[routerlink *='cart']").click();
await page.locator('div li').first().waitFor();
// await page.locator("text =ADIDAS ORIGINAL").click();
const boolTitle = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
console.log(boolTitle);
expect(boolTitle).toBeTruthy();
page.locator('button[type="button"]').last().click();


page.locator('[placeholder="Select Country"]').pressSequentially('ind');
const dropdown = page.locator('.ta-results');
await dropdown.waitFor();
const countDropdown = await dropdown.locator('button').count();
for(let i =0; i<countDropdown; i++){
    const text = await dropdown.locator('button').nth(i).textContent();
    if(text.trim() == 'India'){
        await dropdown.locator('button').nth(i).click();
        break; 
    }
}
// await page.pause();

await expect(page.locator('.user__name [type="text"]').first()).toHaveText('rahul111@shetty.com');      //.user__name label[type="text"]
await page.locator('.action__submit').click();
await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
console.log(orderId);
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
expect(orderId.includes(orderIdDetails)).toBeTruthy();
await page.pause();

// for (let i = 0; i < count; i++) {
//     const productText = await matchProduct.nth(i).locator('b').textContent();
//     console.log(`Product at index ${i}: ${productText}`);
    
//     if (productText === productName) {
//         const addToCartButton = matchProduct.nth(i).locator("text = Add To Cart");
//         console.log(`Clicking on product: ${productName}`);
        
//         // Click the button and wait for any post-click change (you can wait for the cart to update or any confirmation)
//         await addToCartButton.click();
        
//         break;  // Break the loop once the product is added
//     }
    
//     await page.pause();
// }

// execution will pause before closing your test    

// I'm looking for an opportunity where I can take on broader responsibilities, contribute more actively, and continue growing in a collaborative environment. I’m eager to apply the skills I’ve been building and keep learning through new challenges and evolving project needs.
// I'm looking to join a team where I can take on new challenges, grow with real-time responsibilities, and fully utilize the skills I’ve been actively building. I'm eager to contribute in an environment that values continuous learning and offers opportunities to expand both technically and professionally.
// I’m looking for a role where I can grow, contribute to the team, take on new responsibilities, and continue exploring and learning more.
});