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
},
capabilities: {
        'shardTestFiles': false,
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true'],
            //'args': [ "--headless", "--disable-gpu", "--window-size=800,600" ],
            'prefs': {
                'credentials_enable_service': false,
                'profile': {
                    'password_manager_enabled': false
                }
            }
        }
    }
};