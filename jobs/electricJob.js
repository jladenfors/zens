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
                            date: { $gt: ISODate("2012-01-01T00:00:00.000Z")}
                        }
                    );
                });
            self.mdb.query('electric',
                function(collection) {
                    self.respData.res = collection.find(
                        {
                            date: { $gt: ISODate("2012-01-01T00:00:00.000Z")}
                        }
                    );
                });
        });
}

ElectricJob.prototype.start = function(){
    setInterval(function() {
        fs.readFile(this.sensorPath, 'utf-8' ,function (err, data)
        {
            self.mdb.query('temperature',
                function(collection) {
                    collection.insert({sensorId: this.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
                });         
        });
        this.getAggregate();
    }, this.interval); 
    console.log('Electric job started');
};

ElectricJob.prototype.getElectric = function(){
    return JSON.stringify(this.respData);
};

exports.ElectricJob = ElectricJob;

