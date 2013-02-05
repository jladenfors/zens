var http = require('http'),
    zens_http = require('./js/zens_http_server').ZensHttp,
    ZensBackend= require('./js/zens_sensor_fetcher').ZensBackend,
    TemperatureJob = require('./jobs/TemperatureJob.js').TemperatureJob,
    ElectricJob = require('./jobs/ElecJob').ElectricJob,
    MyMongo = require('./db/mongoConnect').MyMongo,
    colors = require('colors');


/**
 * Start the server with this file
 * just type : node zens_server [optional = test]
 *
 * In test mode the db will contain some mock data, and running port will be 8022
 *
 */
var mdb = new MyMongo('127.0.0.1', 27017, 'zens',
    function(){

        var port = 80

        if (process.argv[2] === 'test'){
            console.log('[TEST ENVIRONMENT]!'.magenta);
            port = 8022
            var elJob = new ElectricJob(mdb, "", 'el1');
            elJob.insertData("2100");
            elJob.insertData("2102");
            elJob.insertData("2103");

            var tempJob = new TemperatureJob(mdb, "", 't1');
            tempJob.insertData("4100");
            tempJob.insertData("3101");
            tempJob.insertData("3102");
        }

        zens_http.sensorFetcher(new ZensBackend(mdb));
        http.createServer(zens_http.httpServer).listen(port);
        console.log(('Application started!').red)
    }
)

// User hit Ctrl + C
var killing_app = false;
process.on('SIGINT', function() {
    if (killing_app) {
        console.log(("[PROGRESS] Double SIGINT, Killing without cleanup!").cyan);
        process.exit();
    }
    killing_app = true;
    console.log(("[PROGRESS] Gracefully shutting down from SIGINT (Ctrl+C)").cyan);
    mdb.close()
    process.exit();

});
