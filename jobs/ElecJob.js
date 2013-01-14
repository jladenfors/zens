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
    this.interval =  5*60000;
    this.respData = {};

    this.getPrice = function(success){
        self.mdb.query('price',
            function(collection) {
                collection.findOne(
                    {
                        date: { $gt: 0}
                    }
                    , function(err, doc) {
                        self.respData.price = doc;
                        success;
                    })
            });
    }

    this.getElectric = function(success){
        self.mdb.query(SysConf.eldb,
            function(collection) {
                collection.find(
                    {
                        date: { $gt: 0}
                    }
                ).sort([['date', 1]])
                    .toArray(function(err, docs) {
                        self.respData.res = docs;
                        success();
                    });
            });
    }

    this.getAggregate = function(success){
        self.getPrice(
            self.getElectric(
                function(){
                    success(self.respData);
                }
            )
        );
    };

    this.insertData = function(data){
        self.mdb.query(SysConf.eldb,
            function(collection) {
                collection.insert({sensorId: self.sensorId, date: Math.round(new Date().getTime() / 1000) , data: data.trim()});
            });
    }
}

ElectricJob.prototype.start = function(){
    var parent = this;
    setInterval(function() {
        fs.readFile(parent.sensorPath, 'utf-8' ,function (err, data)
        {
            parent.insertData(data);
        });
    }, parent.interval);
    console.log('Electric job started');
};

exports.ElectricJob = ElectricJob;

