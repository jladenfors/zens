var searcher = require('../js/searcher-compricer');
var redis = require('../redisConnector');


function PriceJob(mdb,sensorId){
    var self = this;
    this.mdb = mdb;    
    this.sensorId = sensorId;
    this.key = 'price';
    this.queue = 'priceQ';

    this.start = function() {        
        searcher.search();
        console.log('Price job started');
        searcher.on('complete', function(data){
            console.log('searcher done!' + data);
            self.mdb.query('price',
                function(collection) {
                    collection.insert({sensorId: self.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data});
                });
        });
    }
}

exports.PriceJob = PriceJob;
