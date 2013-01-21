var http = require('http'),
    zens_http = require('./js/zens_http_server').ZensHttp,    
    ZensBackend= require('./js/zens_sensor_fetcher').ZensBackend,
    MyMongo = require('./db/mongoConnect').MyMongo;


/**
 * Start the server with this file
 * just type : node zens_server
 * @type {MyMongo}
 */
var mdb = new MyMongo('127.0.0.1', 27017, 'zens',
    function(){        
        zens_http.sensorFetcher(new ZensBackend(mdb));
        http.createServer(zens_http.httpServer).listen(8220);
        console.log('Application started!')         
    }
)