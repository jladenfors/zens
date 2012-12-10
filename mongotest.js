var MyMongo = require('./db/mongoConnect').MyMongo;


var db = new MyMongo('localhost', 9000, 'db1');

db.query('temperature', function(collection) {
    collection.insert({hello:'new connector pool'});
});


db.query('electricity', function(collection) {
    collection.insert({hello:'new connector pool 2'});
});
