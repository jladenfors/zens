var assert = require('assert'),    
    MyMongo = require('./../db/mongoConnect').MyMongo,
    ZensBackend= require('../js/zens_sensor_fetcher').ZensBackend,
    SysConf = require('../js/system_conf').SystemConf,
    fs = require('fs');

suite('temperature testcases', function() {
    test('Populate temperature sensor and assert aggregate', function(done) {
        var mdb = new MyMongo('localhost', 27017, 'zens_test',
            function()
            {
                // Insert som mock data
                var tempJob = new TemperatureJob(mdb, "", SysConf.temperature_sensor_id1);
                tempJob.insertData("101");
                // use backend server to retrive data!
                var zensHttp = new ZensBackend(mdb);
                zensHttp.get_t1(function(it){
                    assert.equal("101", it[0].data);
                    mdb.query(SysConf.tempdb,
                        function(collection) {
                            collection.drop();
                        });
                    done();
                });
            });
    });

    test('Verify job runner read directory func', function(done) {

        var mdb = new MyMongo('localhost', 27017, 'zens_test',
            function()
            {
                var myfiles = [];
                // Insert som mock data
                var tempJob = new TemperatureJob(mdb, "/tmp/test2.txt", SysConf.temperature_sensor_id1);
                fs.writeFile('/tmp/test2.txt', '1001');
                tempJob.readSensor(function(data){
                    assert.equal("1001", data);
                    done();
                });
            });
    });
});