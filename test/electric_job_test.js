var assert = require('assert')
    , ElectricJob = require('./../jobs/ElecJob').ElectricJob
    , MyMongo = require('./../db/mongoConnect').MyMongo,
    ZensBackend= require('../js/zens_sensor_fetcher').ZensBackend,
    SysConf = require('../js/system_conf').SystemConf;

suite('electricJob', function() {
    suite('testEl', function() {
        test('get aggregate', function(done) {
            var mdb = new MyMongo('localhost', 27017, 'zens_test',
                function()
                {
                    // Insert som mock data
                    var elJob = new ElectricJob(mdb, "", 'el1');                    
                    elJob.insertData("100");
                    // use backend server to retrive data!
                    var zensHttp = new ZensBackend(mdb);
                    zensHttp.get_e1(function(it){                        
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