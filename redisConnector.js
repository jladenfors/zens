var redis = require('redis')
, jsonify = require('redis-jsonify');

var authKey = 'testPwd';

//add somecommand to the blacklist
jsonify.blacklist.push('save');

function connect(){
	var client = jsonify(redis.createClient('6379', '127.0.0.1'));
    client.auth(authKey, function(data, code){
        if (code != 'OK')
            console.log('On Auth Error! ' + code);
    });

    client.on("error", function (err) {
        console.log("On general error: " + err);
    });
    
    return client
}

exports.connect = connect;
