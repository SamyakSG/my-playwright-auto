class LoginPage {
    constructor(page) {
        this.page = page;
        this.signInButton = page.locator("#login");
        this.userName = page.locator("#userEmail");
        this.password = page.locator("#userPassword");
    }
    async validLogin(userName,passsword) {
        await this.userName.fill(userName);
        await this.password.fill(passsword);
        await this.signInButton.click();
        await this.page.waitForLoadState('networkidle');  //wait untill all networks call are successfully made . then only get all text content

    }
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

}
module.exports = {LoginPage}
