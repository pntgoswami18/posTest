var commonUtils = function() {};

commonUtils.eventual = function(expectedCondition) {
  return browser.wait(expectedCondition, 10000).then(function() {
    return true;
  }, function() {
    return false;
  });
};

module.exports = commonUtils;