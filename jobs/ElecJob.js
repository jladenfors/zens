var fs = require('fs'), SysConf = require('../js/system_conf').SystemConf;

/**
 * Read the electric sensor, this to be invoked using "new"
 */
function ElectricJob(mdb, sensorPath, sensorId){
    var self = this;
    this.mdb = mdb;
    this.sensorPath = sensorPath;
    this.sensorId = sensorId;
    this.price = 0;
    this.interval =  SysConf.sensor_poll*6;
    this.respData = {};

    this.insertData = function(data){
        self.mdb.query(SysConf.eldb,
            function(collection) {
                collection.insert({sensorId: self.sensorId, date: Math.round(new Date().getTime() / 1000) , data:  SysConf.safeTrim(data)});
            });
    }

    this.run = function() {        
        setInterval(function() {            
            fs.readFile(self.sensorPath, 'utf-8' ,function (err, data)
            {
                self.insertData(data);
            });
        }, self.interval);
        console.log('Electric job started');
    }
    
    return {
        start: this.run,
        insertData: this.insertData
    }
}


exports.ElectricJob = ElectricJob;

