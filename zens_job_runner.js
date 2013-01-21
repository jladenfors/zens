var TemperatureJob = require('./jobs/TemperatureJob').TemperatureJob,
    ElectricJob = require('./jobs/ElecJob').ElectricJob,
    PriceJob = require('./jobs/PriceParserJob').PriceJob,
    MyMongo = require('./db/mongoConnect').MyMongo
    SysConf = require('./js/system_conf').SystemConf;


/**
 * Start the server with this file
 * just type : node zens_server
 * @type {MyMongo}
 */
var mdb = new MyMongo(SysConf.mongo_url, SysConf.mongo_port, SysConf.mongo_schema,
    function(){
        var tempJob = new TemperatureJob(mdb, "/mnt/1wire/28.434F99030000/temperature", SysConf.temperature_sensor_id1);
        var elJob = new ElectricJob(mdb, "/mnt/1wire/1D.4D8B0F000000/counters.A", SysConf.electric_sensor_id1);
        var priceJob = new PriceJob(mdb, 'price1');
        tempJob.start();
        elJob.start();
        priceJob.start();
        console.log('Job application started!')
    }
)