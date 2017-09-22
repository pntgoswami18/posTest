var posLogin = require('./posLocators/posLogin.js');
var posSelectInstance = require('./posLocators/selectInstance.js');
var posSelectOutlet = require('./posLocators/selectOutlet.js');
var commonUtils  = require('./commonUtils.js');

var baseURL = 'https://d2cflcu510amrk.cloudfront.net/';

describe('cPOS Sanity Test', function(){
    var login;
    var selectOutlet;
    var selectInstance;

    browser.ignoreSynchronization = true;
    browser.get(baseURL);
    
    browser.wait(protractor.ExpectedConditions.alertIsPresent(), 5000, "Alert is not getting present");
    browser.switchTo().alert().accept();

    afterAll(() => {
        console.log("\n********\nReport at: file:///Users/pntgoswami18/POS-TEST/reports/htmlReport.html");
    })

    it('Should Load POS Login Page Successfully', function(){
        login = new posLogin();

        expect(login.loginCard.isDisplayed()).toBe(true, 'Login Card was not visible');
        expect(login.userName.isDisplayed()).toBe(true, 'Username field was not visible');
        expect(login.password.isDisplayed()).toBe(true, 'Password field was not visible');

    });

    it('Should Login to POS Successfully', function(){
        login  = new posLogin();
        selectOutlet = new posSelectOutlet();

        login.userName.sendKeys('test');
        login.password.sendKeys('test');
        login.loginButton.click();
        expect(commonUtils.eventual(protractor.ExpectedConditions.presenceOf(selectOutlet.outletCard))).toBe(true, 'Eventual failed');

        expect(selectOutlet.outletCard.isDisplayed()).toBe(true, 'User was not logged in');


    });

});