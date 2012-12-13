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
                    self.respData.price = collection.find(
                        {
                            date: { $gt: new Date("2012-01-01T00:00:00.000Z")}
                        }
                    );
                });
            self.mdb.query('electric',
                function(collection) {
                    self.respData.res = collection.find(
                        {
                            date: { $gt: new Date("2012-01-01T00:00:00.000Z")}
                        }
                    );
                });
        });
}

ElectricJob.prototype.start = function(){
	
    var parent = this;

    setInterval(function() {
        fs.readFile(parent.sensorPath, 'utf-8' ,function (err, data)
        {
            parent.mdb.query('temperature',
                function(collection) {
                    collection.insert({sensorId: parent.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
                });         
        });
        parent.getAggregate();
    }, parent.interval); 
    console.log('Electric job started');
};

ElectricJob.prototype.getElectric = function(){
    return JSON.stringify(this.respData);
};

exports.ElectricJob = ElectricJob;

