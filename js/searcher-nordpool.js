var Searcher = require('./searcher');

var searcher = new Searcher({
	merchantName: 'Nordpool',
	merchantUrl: 'https://elbas.nordpoolspot.com/elex/wl/market_statistics.jsp?area=SE3'
});

module.exports = searcher;

searcher.getSearchUrl = function(query) {
	return this.merchantUrl + "&day=" + query;
}

searcher.parseHTML = function(window) {
	var priceMap = {}
	var $ = window.$; 	
 	$("table:eq(2)").each(
 		function(it) { 						 
			 $(this).find("tr").each( function() {    	  	     	  	 	
				var key = 0;
				var prices = "";
    	  	 	$(this).find("td").each ( function() {				      
				      	if ($(this).text().trim().indexOf('PH') == 0){
      						key = $(this).text().trim();
			      		}else{
			      			prices = prices + ":" + $(this).text();
      					}
      			})
      			priceMap[key] = prices;
      		})
    	}
    );
    
    Object.keys(priceMap).forEach(
	    function(i){
    		console.log (priceMap[i] +":"+i);
    	}
    )
}
