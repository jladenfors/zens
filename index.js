var app = require('http').createServer(handler), 
  	fs = require('fs'),
    TemperatureJob = require('./jobs/TemperatureJob').TemperatureJob,
    ElectricJob = require('./jobs/ElecJob').ElectricJob,
    PriceJob = require('./jobs/PriceParserJob').PriceJob,
    MyMongo = require('./db/mongoConnect').MyMongo,
  	path = require('path');

// Setup db connection
var mdb = new MyMongo('127.0.0.1', 27017, 'zens');
var tempJob = new TemperatureJob(mdb, "/mnt/1wire/28.434F99030000/temperature", 'temp1');
var elJob = new ElectricJob(mdb, "/mnt/1wire/1D.4D8B0F000000/counters.A", 'el1');
var priceJob = new PriceJob(mdb, 'price1');

app.listen(80);

function handler (request, response) {
     
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './web/index.html';

    
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.png':
            contentType = 'image/png';
        	break;
    }
     
    fs.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
    
    var rest = request.url.split('?')[0];
    if (rest == '/getEl'){
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(elJob.getAggregate());        
        response.end();
    }
    if (rest == '/getTemp'){
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(tempJob.getAggregate());
        response.end();      
    }
}

tempJob.start();
elJob.start();
priceJob.start();

