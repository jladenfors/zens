/**
 * From http://ronderksen.nl/2012/05/03/debugging-mocha-tests-in-webstorm/ 
 */
var Mocha = require('mocha'),
    path = require('path'),
    fs = require('fs');

var mocha = new Mocha({
    reporter: 'dot',
    ui: 'tdd',
    timeout: 999999
});

var testDir = './test/';

fs.readdir(testDir, function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(function (file) {
        if (path.extname(file) === '.js') {
            console.log('adding test file: %s', file);
            mocha.addFile(testDir + file);
        }
    });

    var runner = mocha.run(function () {
        console.log('finished');
    });

    runner.on('pass', function (test) {
        console.log('... %s passed', test.title);
    });

    runner.on('fail', function (test) {
        console.log('... %s failed', test.title);
    });
});