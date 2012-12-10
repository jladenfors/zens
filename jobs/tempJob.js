var fs = require('fs');
var redis = require('../redisConnector');

var key = 'tempMonth';
var queue = 'temp';
var respData = {};

/**
 Watch temperature two times a minute, and store in redis server
 */
function start(){

    setInterval(function() {fs.readFile('/mnt/1wire/28.434F99030000/temperature', 'utf-8' ,function (err, data)
    {
        var client =
            redis.connect().
                on("connect", function(){
                    client.incr( 'nextid'+key , function( err, id ) {
                        client.hset(key, id, { date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
                        client.expire(key, 30*24*60*60);
                        client.quit();
                    });
                });
        getAggregate();
    });
    }, 5*60000);
    console.log('Temperature job started');
}

function getAggregate(){
    var client = redis.connect().on("connect",
        function()
        {
            client.hvals(key,
                function(err, res)
                {
                    respData = res;
                });
        });
}

function getTemp(){
    return JSON.stringify(respData);
}

exports.start = start;
exports.getAggregate = getAggregate;
exports.getTemp = getTemp;
