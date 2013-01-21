var http = require('http'),
    zens_http = require('./js/zens_http_server').ZensHttp,    
    ZensBackend= require('./js/zens_sensor_fetcher').ZensBackend,
    TemperatureJob = require('./jobs/TemperatureJob.js').TemperatureJob,
    ElectricJob = require('./jobs/ElecJob').ElectricJob,
    MyMongo = require('./db/mongoConnect').MyMongo;


/**
 * Start the server with this file
 * just type : node zens_server
 * @type {MyMongo}
 */
var mdb = new MyMongo('127.0.0.1', 27017, 'zens',
    function(){

        /*
        var elJob = new ElectricJob(mdb, "", 'el1');
        elJob.insertData("100");
        elJob.insertData("102");
        elJob.insertData("103");
        
        var tempJob = new TemperatureJob(mdb, "", 't1');
        tempJob.insertData("100");
        tempJob.insertData("101");
        tempJob.insertData("102");
        */
        zens_http.sensorFetcher(new ZensBackend(mdb));
        http.createServer(zens_http.httpServer).listen(8022);
        console.log('Application started!')         
    }
)
