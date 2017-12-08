var Jasmine2HtmlReporter = require('protractor-jasmine2-html-reporter');
var Jasmine2JSONReporter = require('jasmine-json-test-reporter');
//var CustomJSONReporter = require('./myReporter.js')
var CustomJSONReporter = require('jasmine-custom-reporters/spec-json-reporter');
var myReporter = new CustomJSONReporter('./reports/customJSONReport.json');

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

   /*  jasmine.getEnv().addReporter(
        new CustomJSONReporter({
            file: './reports/pos-test-report.json',
            beautify: true,
            indentationLevel: 1
        })
    ); */
    jasmine.getEnv().clearReporters();
    jasmine.getEnv().addReporter(myReporter);

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
