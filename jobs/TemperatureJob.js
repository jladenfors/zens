var fs = require('fs');

/**
 * Start temperature cron job.
 * 
 * todo setup jobs as a separate node instance which system cron controls.
 */
function TemperatureJob(mdb, sensorPath, sensorId){    
    this.mdb = mdb;
    this.sensorPath = sensorPath;
    this.sensorId = sensorId;        
    this.interval =  5*60000;
    this.respData = {};       
}

TemperatureJob.prototype.start = (function (){
    // Get initial data.
    var parent = this;
    setInterval(
        function() {
            fs.readFile(parent.sensorPath, 'utf-8' ,function (err, data)
            {
                parent.mdb.query('temperature',
                    function(collection) {
                        collection.insert({sensorId: parent.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
                    });                
            });
        }, parent.interval);
    console.log('Temperature job started');
});

exports.TemperatureJob = TemperatureJob;
