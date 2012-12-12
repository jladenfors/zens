var exec = require("child_process").exec;
var temp = require("./tempJob");
var el = require("./electricJob");

function start(response) {
    response.writeHead(200, {"Content-Type": "text/plain"});
    temp.temperature();
	el.current();
    response.end();
}

function upload(response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Upload");
  response.end();
}

exports.start = start;
exports.upload = upload;

