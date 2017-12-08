var fs = require('fs');

var defaultOpts = {
	file: 'jasmine-test-results.json',
	beautify: true,
	indentationLevel: 4 
};

function reporter(opts) {
	var options = shallowMerge(defaultOpts, typeof opts === 'object' ? opts : {});
	var specResults = [];
	var masterResults = Object.create(null);

	this.suiteDone = function(suite) {
		suite.specs = specResults;
		masterResults[suite.id] = suite;
		specResults = [];
	};

	this.specDone = function(spec) {
		specResults.push(spec);
	};

	this.jasmineDone = function() {
		var resultsOutput = options.beautify ?
			JSON.stringify(masterResults, null, options.indentationLevel) :
			JSON.stringify(masterResults);

		fs.writeFileSync(options.file, resultsOutput);
    };
    
    var myReporter = {
        jasmineStarted: function(suiteInfo){
            console.log('Running Suite with '+suiteInfo.totalSpecsDefined);
    
        },
    
        suiteStarted: function(result) {
            console.log('Suite started: ' + result.description + ' whose full description is: ' + result.fullName);
        },
    
        specStarted: function(result) {
            console.log('Spec Started: '+result.description+' whose full description is: ' + result.fullName);
        },
    
        specDone: function(result) {
            console.log('Spec: ' + result.description + ' was ' + result.status);
            for(var i = 0; i< result.failedExpectations.length; i++) {
                console.log('Failure: '+result.failedExpectations[i].message);
            }
    
            console.log(result.passedExpectations.length);
        },
    
        suiteDone: function(result) {
            console.log('Suite: ' + result.description + ' was ' + result.status);
            for(var i = 0; i < result.failedExpectations.length; i++) {
                console.log('AfterAll '+ result.failedExpectations[i].message);
            }    
        },
    
        jasmineDone: function(){
            console.log('Finished suite');
        }
    };

};

function shallowMerge(obj1, obj2) {
	var mergedObj = {};

	Object.keys(obj1).forEach(function(key) {
		if (!obj2[key]) mergedObj[key] = obj1[key];
		else mergedObj[key] = obj2[key];
	});

	return mergedObj;
};


module.exports = reporter;
