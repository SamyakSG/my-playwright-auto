const { LoginPage } = require('./Loginpage');
const { DashboardPage } = require('./DashboardPage');
class POManager{
    constructor(page){
        this.page = page;
        this.Login = new LoginPage(this.page);
        this.DashboardPage = new DashboardPage(this.page);
    }
    getLoginPage(){
        return this.Login;
    }
    getDashboardPage(){
        return this.DashboardPage;
    }
}
module.exports ={POManager}