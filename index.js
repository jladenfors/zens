var app = require('http').createServer(handler), 
  	fs = require('fs'), 
  	temp = require('./jobs/tempJob'),
  	el = require('./jobs/electricJob'), 
  	price = require('./jobs/priceJob'), 
  	path = require('path'); 
  
app.listen(80);

function handler (request, response) {
     
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';

    
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
        response.write(el.getElectric());        
        response.end();
    }
    if (rest == '/getTemp'){
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(temp.getTemp());
        response.end();      
    }
}

temp.start();
temp.getAggregate();
el.start();
el.getAggregate();
price.start();

