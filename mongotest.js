var MyMongo = require('./db/mongoConnect').MyMongo;

var mdb = new MyMongo('127.0.0.1', 27017, 'zens');
setInterval(function() {

    mdb.query('temperature', function(collection) {
        collection.insert({hello:'new connector pool'});
    });

    mdb.query('electricity', function(collection) {
        collection.insert({hello:'new connector pool 2', date: new Date()});
    });

    console.log("find stuff!");
    mdb.query('electricity', function(collection) {
        var apa = collection.find(
            {
                date: { $gt: new Date("2012-01-01T00:00:00.000Z")}
            }
        ).sort([['date', 1]])
            .toArray(function(err, docs) {
                console.log(docs);
            });

    });

}, 2000);

