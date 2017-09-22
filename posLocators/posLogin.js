var posLogin = function() {

};

posLogin.prototype = Object.create({},{
    
    loginCard: {
        get: function() {
            return element(by.className('login-card'));
        }
    },

    userName: {
        get: function() {
            return this.loginCard.all(by.xpath('//*[@name="username"]')).get(0);
        }
    },

    password: {
        get: function() {
            return this.loginCard.all(by.xpath('//*[@name="password"]')).get(0);
        }
    },

    loginButton: {
        get: function() {
            return this.loginCard.all(by.className('custom-button primary-button')).get(0);
        }
    }
});

module.exports = posLogin;