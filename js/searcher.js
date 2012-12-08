// External Modules
var request = require('ahr2'), // Abstract-HTTP-request https://github.com/coolaj86/abstract-http-request
sys = require('sys'),		// System
events = require('events'),	// EventEmitter
jsdom = require('jsdom');	// JsDom https://github.com/tmpvar/jsdom

var jQueryPath = 'http://code.jquery.com/jquery-1.4.2.min.js';
var headers = {'content-type':'application/json', 'accept': 'application/json'};

// Export searcher
module.exports = Searcher;

function Searcher(param) {
	if (param.headers) {
		this.headers = param.headers;
	} else {
		this.headers = headers;
	}

	this.merchantName = param.merchantName;
	this.merchantUrl = param.merchantUrl;
	this.id = param.merchantUrl;
	this.data = param.data;
}

// Inherit from EventEmitter
Searcher.prototype = new process.EventEmitter;

Searcher.prototype.search = function(query, collector) {
	var self = this;
	var url = self.getSearchUrl(query);

	console.log('Connecting to... ' + url);
			console.log('Fetched content from... ' + url);
			jsdom.env({
			html: url, 
			scripts: ["http://code.jquery.com/jquery.js"],
			done: function(error, window) {
				var data = self.parseHTML(window);
				self.onComplete(data);
				}
			});				
}

// Implemented in inhetired class
Searcher.prototype.getSearchUrl = function(query) {
	throw "getSearchUrl() is unimplemented!";
}
// Implemented in inhetired class
Searcher.prototype.parseHTML = function(window) {
	throw "parseForBook() is unimplemented!";
}
// Emits 'item' events when an item is found.
Searcher.prototype.onItem = function(item) {
	this.emit('item', item);
}
// Emits 'complete' event when searcher is done
Searcher.prototype.onComplete = function(searcher) {
	this.emit('complete', searcher);
}
// Emit 'error' events
Searcher.prototype.onError = function(error) {
	this.emit('error', error);
}

Searcher.prototype.toString = function() {
	return this.merchantName + "(" + this.merchantUrl + ")";
}
