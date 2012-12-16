var fs = require('fs');

/**
 * Read the electric sensor 
 */
function ElectricJob(mdb, sensorPath, sensorId){
    var self = this;
    this.mdb = mdb;
    this.sensorPath = sensorPath;
    this.sensorId = sensorId;
    this.price = 0;
    this.interval =  5*60000;
    this.respData = {};

    this.getAggregate = (
        function(){
            self.mdb.query('price',
                function(collection) {
                    collection.findOne(
                        {
                            date: { $gt: 0}
                        }
                    , function(err, doc) {
			self.respData.price = doc;
			})
		  });              
            self.mdb.query('electric',
                function(collection) {
                    collection.find(
                        {
                            date: { $gt: 0}
                        }
                    ).sort([['date', 1]])
                        .toArray(function(err, docs) {
                            self.respData.res = docs;
                        });
                });	
		return JSON.stringify(self.respData);
        });
}

ElectricJob.prototype.start = function(){
    var parent = this;
    setInterval(function() {
        fs.readFile(parent.sensorPath, 'utf-8' ,function (err, data)
        {
            parent.mdb.query('electric',
                function(collection) {
                    collection.insert({sensorId: parent.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
                });         
        });
        parent.getAggregate();
    }, parent.interval); 
    console.log('Electric job started');
};

exports.ElectricJob = ElectricJob;

