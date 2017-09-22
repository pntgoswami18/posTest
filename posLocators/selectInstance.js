var selectInstance = function() {

};

selectInstance.prototype = Object.create({}, {

    instanceCard: {
        get: function() {
            return element(by.className('instance-card'));
        }
    },

    instance: {
        get: function() {
            return this.instanceCard.all(by.className('card-section')).get(0);
        }
    },

    goBackButton: {
        get: function() {
            return this.instanceCard.all(by.xpath('.//*[@class="custom-button secondary-button"]/ancestor::div[1]')).get(0);
        }
    },

    continueButton: {
        get: function() {
            return this.instanceCard.all(by.className('custom-button primary-button')).get(0);
        }
    }

});

module.exports = selectInstance;