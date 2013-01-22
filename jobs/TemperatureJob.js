var fs = require('fs'),
    SysConf = require('../js/system_conf').SystemConf;

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

    this.setData = function(data){
        self.mdb.query(SysConf.tempdb,
            function(collection) {
                collection.insert({sensorId: self.sensorId, date: Math.round(new Date().getTime() / 1000) , data: safeTrim(data)});
            });
    }

    var safeTrim = function(data){        
        if (data){
            return data.trim();
        }else {
            return data;
        }        
    }
    
    this.getSensorData = function(storeData) {
        fs.readFile(self.sensorPath, 'utf-8' ,function (err, data)
        {
            storeData(data);
        });
    };

    this.run = function (){
        setInterval(self.getSensorData(self.setData), self.interval);
        console.log('Temperature job started');
    };

    return {
        filesystem: this.fs,
        readSensor : this.getSensorData,
        start : this.run,
        insertData : this.setData
    }
}

exports.TemperatureJob = TemperatureJob;
