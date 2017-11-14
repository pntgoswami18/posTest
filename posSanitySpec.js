var posLogin = require('./posLocators/posLogin.js');
var posSelectInstance = require('./posLocators/selectInstance.js');
var posSelectOutlet = require('./posLocators/selectOutlet.js');
var commonUtils  = require('./commonUtils.js');

var baseURL = 'https://web-pos-service-test.limetray.in/';

describe('cPOS Sanity Test', function(){
    var login;
    var selectOutlet;
    var selectInstance;

    var userName = 'pos2@pos.com';
    var password = 'test';

    browser.ignoreSynchronization = true;
    browser.get(baseURL);
    browser.sleep(5000);


    afterAll(() => {
        console.log("\n********\nReport at: file:///Users/pntgoswami18/POS-TEST/reports/htmlReport.html \n********\n");
    })

    /*
     * It should load the webPOS.
     */

    it('Should Load POS Login Page Successfully', function(){
        login = new posLogin();

        expect(commonUtils.eventual(login.loginCard)).toBe(true, "Login Card was not present");

        expect(login.loginCard.isDisplayed()).toBe(true, 'Login Card was not visible');
        expect(login.userName.isDisplayed()).toBe(true, 'Username field was not visible');
        expect(login.password.isDisplayed()).toBe(true, 'Password field was not visible');

    });

    /*
     * It should Login to webPOS.
     */

    it('Should Login to POS Successfully', function(){
        login  = new posLogin();
        selectOutlet = new posSelectOutlet();

        //expect logged in
        //expect(commonUtils.eventual())

        login.userName.sendKeys(userName);
        login.password.sendKeys(password);
        login.loginButton.click();
        
        // wait for outletCard to appear until 10 seconds passby
        expect(commonUtils.eventual(selectOutlet.outletCard)).toBe(true, 'Outlet Card was not visible');

    });

    /*
     * It should select an outlet under a brand.
     */

    it('Should select the outlet successfully', function(){
        selectOutlet = new posSelectOutlet();
        selectInstance = new posSelectInstance();

        expect(selectOutlet.outletsList.isDisplayed()).toBe(true, 'Outlet list was not populated');

        selectOutlet.outlet.click();
        selectOutlet.continueButton.click();

        expect(commonUtils.eventual(selectInstance.instanceCard)).toBe(true, 'Instance Card was not visible');

    });

    /*
     * It should select a webPOS instance and load the Staff Login Page.
     */

    it('Should select the instance successfully', function(){
        selectInstance = new posSelectInstance();

        expect(selectInstance.instance.isDisplayed()).toBe(true, 'Instances were not displayed');
        
        selectInstance.instance.click();
        selectInstance.continueButton.click();

    });

});