var commonUtils = function() {};

// Common utility to wait for an element to appear within a timeout
// of 10 seconds.
// Takes protractor element locator as argument.
// Returns boolean value
commonUtils.eventual = function(locator) {
  return browser.wait(protractor.ExpectedConditions.presenceOf(locator), 10000).then(function() {
    return true;
  }, function() {
    return false;
  });
};

commonUtils.clickNTimes = function(locator, n) {
  for(var i = 0; i < n; i++){
    locator.click();
    browser.waitForAngular();
  }
};

module.exports = commonUtils;