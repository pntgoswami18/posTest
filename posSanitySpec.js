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
        
        // wait for outletCard to appear until 10 seconds passby
        expect(commonUtils.eventual(selectOutlet.outletCard)).toBe(true, 'Outlet Card was not visible');

    });

    it('Should select the outlet successfully', function(){
        selectOutlet = new posSelectOutlet();
        selectInstance = new posSelectInstance();

        expect(selectOutlet.outletsList.isDisplayed()).toBe(true, 'Outlet list was not populated');

        selectOutlet.outlet.click();
        selectOutlet.continueButton.click();

        expect(commonUtils.eventual(selectInstance.instanceCard)).toBe(true, 'Instance Card was not visible');

    });

    it('Should select the instance successfully', function(){
        selectInstance = new posSelectInstance();

        expect(selectInstance.instance.isDisplayed()).toBe(true, 'Instances were not displayed');
        
        selectInstance.instance.click();
        selectInstance.continueButton.click();

    });

});