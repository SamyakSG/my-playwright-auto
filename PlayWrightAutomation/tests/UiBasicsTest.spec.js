const {test, expect} = require('@playwright/test');
//outer structure of TC 
//test annotation coming from the playwright package
test('Testcase Name -1 PW test', async ({browser}) =>{
//chrome - cookies,plugins
// fixer - global variable which are available across your project

const context = await browser.newContext();
const page = await context.newPage();
const userName = page.locator('#username');
const signIn = page.locator("#signInBtn");

await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
const NewTitle = await page.title();
if(NewTitle == 'LoginPage Practise | Rahul Shetty Academy')
{
  console.log('Matche Title....');
  
}
 //locator help us to locate any element on the page 
 await userName.fill("rahulshetty");   //PW cant access element directly, supports CSS , xpath and us that selectors 
 //'#username' - locate an elem on the page using this selector 
 await page.locator("[type='password']").fill("learning")   //PW cant access element directly, supports CSS , xpath and us that selectors 
 await signIn.click();   
  //PW cant access element directly, supports CSS , xpath and us that selectors 
 //PW cant access element directly, supports CSS , xpath and us that selectors 

 
 console.log(await page.locator("[style*='block']").textContent());
//  await expect(page.locator("[style*='block']")).toContainText('Incorrect');

   // Wait for the 'Incorrect' message to be visible
   await expect(page.locator("[style*='block']")).toContainText('Incorrect', { timeout: 5000 });


 //type - fill
 await userName.fill(""); // Clear the username field
  await userName.fill("rahulshettyacademy"); // Correct username
  await page.locator("[type='password']").fill("learning"); // Correct password

  await signIn.click();
// sign = page.locator("#__").fill("");

  //    Check for successful login (assuming you have a post-login page to check)
console.log(await page.locator('.card-title').first().textContent());
console.log(await page.locator('.card-title').nth(1).textContent());
//    const cardTitleLocator = page.locator('.card-title').nth(0); // Example of post-login check (change this to a valid locator for your successful login state)
//    console.log(await cardTitleLocator.textContent());
const allTitles = await page.locator('.card-title a').allTextContents() 
console.log(allTitles);
await page.pause();

} );

// 2 argu. - title & function , inside fun- pass FIXTURE !!

test('page playwright test UI controls', async ({page}) =>{     //playwright fix, else browser string 
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");  //goto - to land on that page
    // console.log(await page.title());
    // await expect(page).toHaveTitle("Google");
    await page.locator('#username').fill("rahulshettyacademy"); // Correct username
    await page.locator("[type='password']").fill("learning"); // Correct password
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("[href*='documents-request']");
    await dropdown.selectOption("consult");
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();


    console.log(await page.locator(".radiotextsty").last().isChecked());
    // await expect(page.locator(".radiotextsty").last()).toBeChecked();
    await page.locator('#terms').click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();  //wherever the action is performed in the scope, await should be there.
    
    await expect(documentLink).toHaveAttribute('class', 'blinkingText');  //(name , value)
    await page.pause();
   
    } );

    test("Ui child redirect",async ({browser})=>
    {
      const context = await browser.newContext();
      const page = await context.newPage();

      await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
      const documentLink = page.locator("[href*='documents-request']");
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        documentLink.click()
      ])
      const text = await newPage.locator('.red').textContent();
      const Arraytext = text.split("@");
      const splitDomain = Arraytext[1].split(" ")[0]
      console.log(splitDomain);
//       const email = line.split('at ')[1].split(' ')[0];
// const domain = email.split('@')[1];
// console.log(domain);
      await page.locator("#username").fill(splitDomain);
      console.log(text);
  await page.pause();
      console.log(await page.locator("#username").textContent());
      
    });

//anonymuos fun - that do not ghave any name ... async () =>{ };