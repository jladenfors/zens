var path = require('path'), fs = require('fs');

function zens_http_server(){
    
    var tempJob = "";
    var elJob = "";
    
    this.setJobs = function(v_elJob, v_tempJob){        
        tempJob = v_tempJob;
        elJob = v_elJob;    
    }

    this.zens_http = function(request, response) {
        
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
            elJob.getAggregate(
                function(it){
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    response.write(JSON.stringify(it));
                    response.end();
                }
            );
        }
        if (rest == '/getTemp'){
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.write(tempJob.getAggregate());
            response.end();
        }        
    }
    
    return {
        httpServer: this.zens_http,
        setJobs: this.setJobs
    };
}

exports.ZensHttp = zens_http_server();