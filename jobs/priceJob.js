var searcher = require('../js/searcher-compricer');
var redis = require('../redisConnector');

var key = 'price';
var queue = 'priceQ';

function start(){
  //  setInterval(function() {
    		console.log("search for price");
    		searcher.search();           	 
    //}, 1*60000); 
    console.log('Price job started');
}

searcher.on('complete', function(data){
	console.log('searcher done!' + data);
	var client = redis.connect().on("connect", function(){
            		client.set(key, String(data));
            		client.expire(key, 30*24*60*60);
            		client.quit();
        		});
});

exports.start = start;
