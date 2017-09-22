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

module.exports = commonUtils;