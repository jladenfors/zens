var fs = require('fs');

/**
 * Start temperature cron job.
 * 
 * todo setup jobs as a separate node instance which system cron controls.
 */
function TemperatureJob(mdb, sensorPath, sensorId){
    var self = this;
    this.mdb = mdb;
    this.sensorPath = sensorPath;
    this.sensorId = sensorId;        
    this.interval =  5*60000;
    this.respData = {};
    
    this.getAggregate = (
        function(){
            self.mdb.query('temperature',
                function(collection) {
                    self.respData = collection.find(
                        {
                            date: { $gt: ISODate("2012-01-01T00:00:00.000Z")}
                        }                        
                    );
                });
        });

}

TemperatureJob.prototype.start = (function (){
    // Get initial data.
    this.getAggregate();
    
    setInterval(
        function() {
            fs.readFile(this.sensorPath, 'utf-8' ,function (err, data)
            {
                self.mdb.query('temperature',
                    function(collection) {
                        collection.insert({sensorId: this.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
                    });
                this.getAggregate();
            });
        }, this.interval);
    console.log('Temperature job started');
});

TemperatureJob.prototype.getData = function() {
    return JSON.stringify(this.respData);
};


exports.TemperatureJob = TemperatureJob;
