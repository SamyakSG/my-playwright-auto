class DashboardPage {
    constructor(page) {
        this.matchProduct = page.locator('.card-body');
        this.productText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink *='cart']");
    }

    async searchProductAddCart(productName) {
        const title = await this.productText.allTextContents();
    //OR   // await page.locator('.card-body b').first().waitFor();  // only working when your Locator returns only single element, nOT HERE FOR MULTI AND ISSUE WHICH TO WAIT FOR.
        console.log(title);
        // await page.pause();

        // const matchProduct = page.locator('.card-body');
        // const productName = 'ADIDAS ORIGINAL';
        const count = await this.matchProduct.count();
        console.log(count);
        for (let i = 0; i < count; i++) {
            if (await this.matchProduct.nth(i).locator('b').textContent() === productName) {
                const AddCartProduct = await this.matchProduct.nth(i).locator("text = Add To Cart").click();
                console.log(AddCartProduct);
                break;
            }
        }
    }

    async navigateToCart() {
        await this.cart.click();

    }

}
module.exports = { DashboardPage };