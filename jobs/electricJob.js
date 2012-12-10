var fs = require('fs');
var redis = require('../redisConnector');

var key = 'elMonth';
var queue = 'monthE1';
var oneWireMnt = '/mnt/1wire/1D.4D8B0F000000/counters.A';
var respData = {};

function start(){
    setInterval(function() {fs.readFile(oneWireMnt, 'utf-8' ,function (err, data)
    {
        var client = redis.connect().on("connect", function(){
            client.incr( 'nextid'+key , function( err, id ) {
                client.hset(key, id, { date: Math.round(new Date().getTime() / 1000).toString() , data: data.trim()});
                client.expire(key, 30*24*60*60);
                client.quit();
            });
        });
    });
        getAggregate();
    }, 5*60000); // every 5 minutes

    console.log('Electric job started');
}

function getAggregate(){
    var client = redis.connect().on("connect",
        function()
        {
            var price;
            client.get('price', function(err, data){price = data;});
            client.hvals(key,
                function(err, res)
                {
                    respData.price = price;
                    respData.res = res;
                });
        });
}

function getElectric(){
    return JSON.stringify(respData);
}

exports.start = start;
exports.getAggregate = getAggregate;
exports.getElectric = getElectric;

