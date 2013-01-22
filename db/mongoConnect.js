var mongodb = require('mongodb');

/**
 * http://stackoverflow.com/questions/10108170/node-js-reuse-mongodb-reference
 */

function MyMongo(host, port, dbname, onConnect) {
    this.host = host;
    this.port = port;
    this.dbname = dbname;
    this.db = undefined;
    var self = this;
    
    this.server = new mongodb.Server(
        this.host,
        this.port,
        {auto_reconnect: true, poolSize: 4});

    this.db_connector = new mongodb.Db(this.dbname, this.server, {w:0, native_parser: false});

    this.db_connector.open(function(err, db) {
        if( err ) {
            console.log(err);
            return;
        }
        self.db = db;
        onConnect();
    });
    
}

MyMongo.prototype.query = function(collectionName, callback) {    
    if (this.db != undefined) {                
        var collection = new mongodb.Collection(this.db, collectionName);
        callback(collection);
        return;
    }else{
        console.log("Error connection to db");
    }
}

MyMongo.prototype.close = function() {
    this.db.close();
}

exports.MyMongo = MyMongo;
