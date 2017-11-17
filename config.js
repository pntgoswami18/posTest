var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');

exports.config={
seleniumAddress: 'http://localhost:4444/wd/hub',
framework: 'jasmine2',
suites: { pos_sanity:'./posSanitySpec.js'},
onPrepare: function() {
    jasmine.getEnv().addReporter(
        new Jasmine2HtmlReporter({
            savePath: './reports/',
            screenshotsFolder: 'screenshots',
            takeScreenshots: true,
            takeScreenshotsOnlyOnFailures: false,
            cleanDestination: true,
            showPassed: true,
            fileNameDateSuffix: false
        })
    );
    browser.manage().timeouts().implicitlyWait(5000);
},
capabilities: {
        'shardTestFiles': false,
        'browserName': 'chrome',
        'chromeOptions': {
            'args': [ "--headless", "--disable-gpu", "--window-size=1024,768" ],
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            }
        }
    }
};
