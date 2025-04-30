// https://rahulshettyacademy.com/client/
// Rahul  shetty
// rahul111@shetty.com
// Phone num =- 1111111111
// occupaton - student
// Gender - Male 
// Learning@111

const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../PageObjects/Loginpage');
const { DashboardPage } = require('../PageObjects/DashboardPage');
const { POManager } = require('../PageObjects/POManager');
const dataset = JSON.parse(JSON.stringify(require('./utils/placeorderTestData.json')));

test('Client App Login - Validation App - Test practise', async ({ page }) => {
    const poManager = new POManager(page);
    const userName = 'rahul111@shetty.com';
    const password = 'Learning@111';
    const matchProduct = page.locator('.card-body');
    const productName = 'ADIDAS ORIGINAL';
    
    // const loginPage = new LoginPage(page);
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(dataset.userName, dataset.password)
    // await page.pause();
    // const dashboardPage = new DashboardPage(page);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(dataset.productName);
    await dashboardPage.navigateToCart();


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
    for (let i = 0; i < countDropdown; i++) {
        const text = await dropdown.locator('button').nth(i).textContent();
        if (text.trim() == 'India') {
            await dropdown.locator('button').nth(i).click();
            break;
        }
    }
    // await page.pause();

    await expect(page.locator('.user__name [type="text"]').first()).toHaveText('rahul111@shetty.com');
    await page.locator('.action__submit').click();
    await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ');
    const orderId = await page.locator('.em-spacer-1 .ng-star-inserted').textContent();
    console.log(orderId);
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
    expect(orderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();



});