var SysConf = require('../js/system_conf').SystemConf;

/**
 * Read the electric sensor, this to be invoked using "new"
 */
function zens_sensor_fetcher(mongoHandle){
    var self = this;
    this.mdb = mongoHandle;
    this.price = 0;
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
                        if(err){
                            console.log(err);
                        }
                        self.respData.res = docs;
                        success();
                    });
            });
    }

    this.getE1Aggregate = function(success){
        self.getPrice(
            self.getElectric(
                function(){
                    success(self.respData);
                }
            )
        );
    };

    this.getT1Aggregate = function(success){
        self.mdb.query(SysConf.tempdb,
            function(collection) {
                collection.find(
                    {
                        date: { $gt: 0 }
                    }
                ).sort([['date', 1]])
                    .toArray(function(err, docs) {
                        console.log("docs " + docs);
                        if(err){
                            console.log(err);
                        }
                        success(docs);
                    });
            });
    };

    return{
        get_t1 : this.getT1Aggregate,
        get_e1 : this.getE1Aggregate
    }
};

exports.ZensBackend = zens_sensor_fetcher;

