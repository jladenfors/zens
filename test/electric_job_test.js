var assert = require('assert')
    , ElectricJob = require('./../jobs/ElecJob').ElectricJob
    , MyMongo = require('./../db/mongoConnect').MyMongo,
    SysConf = require('../js/system_conf').SystemConf;

suite('electricJob', function() {
    suite('testEl', function() {
        test('get aggregate', function(done) {
            var mdb = new MyMongo('localhost', 27017, 'zens_test',
                function()
                {
                    var elJob = new ElectricJob(mdb, "", 'el1');
                    elJob.insertData("100");
                    elJob.getAggregate(function(it){
                        console.log(it);
                        assert.equal(100, it.res[0].data);
                        mdb.query(SysConf.eldb,
                            function(collection) {
                                collection.drop();
                            });
                        done();
                    });
                });
        });
    });
});