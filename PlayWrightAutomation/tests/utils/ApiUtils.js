const Module = require("module");

class APIUtils {

    constructor(apiContext, loginPayLoad){
        this.apiContext = apiContext //instance of the variable. 'this' refers to Current (whole) complete Class, so access anywhere !!
        this.loginPayLoad = loginPayLoad
    }

    async getToken() {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login", {
            data: this.loginPayLoad,
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
                const token = loginResponseJson.token;
                console.log('Token:', token);
                return token;
            } catch (err) {
                console.error('Error parsing response as JSON:', err);
            }
        } else {
            console.error('Failed to log in, received non-200 response');
        }
    }
    async createOrder(orderPayLoad){
        let response = {};
        response.token = await this.getToken()
        const orderResponse = await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
            data: orderPayLoad,
            headers: {
                'Authorization': response.token,//this.getToken(),
                'content-type': 'application/json',
            }
        });
        
            const orderResponseJson = await orderResponse.json();
            // const orderResponseJson = await json.parse(orderResponse);
                console.log(orderResponseJson);
                const orderId = orderResponseJson.orders[0];
                response.orderId = orderId;
                return response;
    }



}
module.exports ={APIUtils}