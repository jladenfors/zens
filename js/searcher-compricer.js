var Searcher = require('./searcher');

var searcher = new Searcher({
	merchantName: 'Nordpool',
	merchantUrl: 'https://www.compricer.se/el/jamfor_el/order.php?subscriptionid=954&domain=&userzip=75655&phonenr=018404737&powerusage=5000&environmentfeeid=9166&housing=house&agreement_payment=invoice',
	data: "rr"
});

searcher.getSearchUrl = function(query) {
	return this.merchantUrl;
}

searcher.parseHTML = function(window) {
	var price = 0;
	var $ = window.$; 	
 	$(".rightcell_order_subscription_detailWeb2 a").each(
 		function() { 						 
 			 price = parseFloat($(this).text().split('ö')[0]) / 100;
			 console.log($(this).text().split('ö')[0]);
    	}
    );     
    return price;   
}

searcher.getPrice = function(){
	return this.data;
} 

module.exports = searcher;