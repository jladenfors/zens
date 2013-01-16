var http = require('http'),
    zens_http = require('./js/zens_http_server').ZensHttp,    
    TemperatureJob = require('./jobs/TemperatureJob').TemperatureJob,
    ElectricJob = require('./jobs/ElecJob').ElectricJob,
    PriceJob = require('./jobs/PriceParserJob').PriceJob,
    MyMongo = require('./db/mongoConnect').MyMongo;
    


var mdb = new MyMongo('127.0.0.1', 27017, 'zens',
    function(){
        var tempJob = new TemperatureJob(mdb, "/mnt/1wire/28.434F99030000/temperature", 'temp1');
        var elJob = new ElectricJob(mdb, "/mnt/1wire/1D.4D8B0F000000/counters.A", 'el1');
        var priceJob = new PriceJob(mdb, 'price1');
        zens_http.setJobs(elJob, tempJob);
        http.createServer(zens_http.httpServer).listen(8220);
        tempJob.start();
        elJob.start();
        //   priceJob.start();
        console.log('Application started!')    
     
    }
)

