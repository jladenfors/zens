var mongodb = require('mongodb');

/**
 * http://stackoverflow.com/questions/10108170/node-js-reuse-mongodb-reference 
 */

function MyMongo(host, port, dbname) {
    this.host = host;
    this.port = port;
    this.dbname = dbname;

    
    this.server = new mongodb.Server(
        '127.0.0.1',
        27017,
        {auto_reconnect: false, poolSize: 4});
    
    
    this.db_connector = new mongodb.Db('zens', this.server, {w:0, native_parser: false});
    
    
    var self = this;

    this.db = undefined;
    this.queue = [];

    this.db_connector.open(function(err, db) {
        if( err ) {
            console.log(err);
            return;
        }
        self.db = db;
        for (var i = 0; i < self.queue.length; i++) {
            var collection = new mongodb.Collection(
                self.db, self.queue[i].cn);
            self.queue[i].cb(collection);
        }
        self.queue = [];

    });
}
exports.MyMongo = MyMongo;

MyMongo.prototype.query = function(collectionName, callback) {
    if (this.db != undefined) {
        var collection = new mongodb.Collection(this.db, collectionName);
        callback(collection);
        return;
    }
    this.queue.push({ "cn" : collectionName, "cb" : callback});
}