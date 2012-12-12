var MyMongo = require('./db/mongoConnect').MyMongo;

var mdb = new MyMongo('127.0.0.1', 27017, 'zens');

mdb.query('temperature', function(collection) {
    collection.insert({hello:'new connector pool'});
});

mdb.query('electricity', function(collection) {
    collection.insert({hello:'new connector pool 2'});
});    
    

