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
    self.getAggregate();
    
    setInterval(
        function() {
            fs.readFile(self.sensorPath, 'utf-8' ,function (err, data)
            {
                self.mdb.query('temperature',
                    function(collection) {
                        collection.insert({sensorId: self.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
                    });
                self.getAggregate();
            });
        }, 5*60000);
    console.log('Temperature job started');
});

TemperatureJob.prototype.getData = function() {
    return JSON.stringify(self.respData);
};


exports.TemperatureJob = TemperatureJob;
