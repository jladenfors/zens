var Db = require('mongodb').Db, Server = require('mongodb').Server;


var conn = (function() {
    return new Db('zens', new Server("127.0.0.1", 27017, {}), {w: 1});
});

var test = (function (obj){
    conn().open(
        function(err, db) {
            // Fetch a collection to insert document into
            var collection = db.collection("temperature");
            collection.insert(obj);
        }
    );
});
exports.test = test;