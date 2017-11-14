var selectOutlet = function() {

};

var outletName = 'OnlyDeliveryOutlet';

selectOutlet.prototype = Object.create({},{

    outletCard: {
        get: function() {
            return element(by.className('outlet-card'));
        }
    },

    outletsList: {
        get: function() {
            return this.outletCard.all(by.xpath('//*[@class="brand-name"]/ancestor::div[1]')).get(0);
        }
    },

    outlet: {
        get: function() {
            return this.outletsList.all(by.xpath(".//*[text()='"+outletName+"'][1]"));
        }
    },

    continueButton: {
        get: function() {
            return this.outletCard.all(by.className('custom-button primary-button'));
        }
    }

});

module.exports = selectOutlet;