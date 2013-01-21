/**
 * This is "El Zensor"
 *
 * 2012, Jonas
 *
 * Start by calling setup!
 */
function Zens() {
    var timeHash = zensTimeHash();

    this.setup = function() {
        // get handle to outer object
        var that = this;

        var temphourHash = {};
        var tempdayHash = {};
        var elhourDelta = {};
        var eldayDelta = {};

        $.ajax({
            type: "GET",
            url: "/getTemp",
            async: false,
            success: function(data){
                data.forEach(
                    function (reply, i) {
                        var json = reply;
                        var d = that.zDate(json);
                        if (new Date().getDate() == d.getDate()){
                            temphourHash[d.getTime()] = parseFloat(json.data).toFixed(1);                            
                        }
                        if (new Date().getMonth() == d.getMonth()) {
                            tempdayHash[d.getTime()] = parseFloat(json.data).toFixed(1);
                        }
                    }
                );
            }
        });


        $.ajax({
            type: "GET",
            url: "/getEl",
            async: false,
            success: function(data){

                var elhourHash = {};
                var eldayHash = {};

                data.res.forEach(
                    function (reply, i) {
                        var json = reply;
                        var eventDate = that.zDate(json);           
                        if (new Date().getDate() == eventDate.getDate()){                            
                            elhourHash[eventDate.getTime()] = json.data/1000;
                        }
                        if (new Date().getMonth() == eventDate.getMonth()) {
                            eldayHash[eventDate.getTime()] = json.data/1000;
                        }
                    }
                );

                elhourDelta = that.calculateDelta(elhourHash);
                eldayDelta = that.calculateDayDelta(eldayHash);
                // Present daily price 
                document.getElementById('price').innerHTML = "Compricer: " + data.price + " Kr/h";
                document.getElementById('currprice').innerHTML = "Totalt idag: " +  that.priceCalculus(data.price, elhourDelta).toPrecision(2) + " Kr";
                document.getElementById('monthprice').innerHTML = "Totalt denna m�nad: " +  that.priceCalculus(data.price, eldayDelta).toPrecision(6) + " Kr";
            }
        });

        that.drawTempGraph(that.orderHashSets(temphourHash), elhourDelta, that.orderHashSets(tempdayHash),eldayDelta );
    };

    this.drawTempGraph = function(tempDaily, elDaily, tempMonthly, elMonthly){
        zensPlot([tempDaily, elDaily], $("#elGraph"), ["C", "Kw/h"], [1, "hour"], "%H", timeHash.today, timeHash.tomorrow, 0, 30);
        zensPlot([tempMonthly, elMonthly], $("#elGraphDay"), ["C", "Kw/h"], [1, "day"], "%d", timeHash.firstDayOfMonth, timeHash.nextMonth, 0, 100);
    };


    /**
     * Calculate price of day intraday.
     * @param price
     * @param elDelta
     * @return {Number}
     */
    this.priceCalculus = function(price, elDelta){
        var cost = 0;
        jQuery.each(elDelta, function(kw){
            if (!isNaN(elDelta[kw][1]))
                cost += price * elDelta[kw][1];
        });
        return cost;
    };

    this.calculateDayDelta = function(map){

        var sortedKeys = this.zensSort(map);
        var sortedValues = [];
        var j = -1;
        var keyValOld = sortedKeys[0];
        var oldZd = new Date();

        jQuery.each(sortedKeys, function(keyVal){
            var zd = new Date(0);
            zd.setTime(parseFloat(sortedKeys[keyVal]))

            if (zd.getDate() != oldZd.getDate()){
                sortedValues[j++] = [parseFloat(sortedKeys[keyVal]), parseFloat(map[sortedKeys[keyVal]] - map[sortedKeys[keyValOld]])];
                keyValOld = keyVal;
            }
            oldZd = zd;
        });
        return sortedValues;
    };

    this.calculateDelta = function(map){        
        var sortedKeys = this.zensSort(map);
        var sortedValues = [];
        var j = 0;
        var keyValOld = sortedKeys[0];
        var oldZd = new Date(0);
        
        jQuery.each(sortedKeys, function(keyVal){
            var zd = new Date(0);
            zd.setTime(parseFloat(sortedKeys[keyVal]));
            if (zd.getHours() != oldZd.getHours()){
                
                sortedValues[j++] = [parseFloat(sortedKeys[keyVal]), parseFloat(map[sortedKeys[keyVal]] - map[sortedKeys[keyValOld]])];
                keyValOld = keyVal;
            }
            oldZd = zd;
        });
        return sortedValues;
    };

    this.orderHashSets = function(hashMap){
        var sortedKeys = this.zensSort(hashMap);        
        var sortedValues = [];
        var i = 0;
        jQuery.each(sortedKeys, function(keyVal){
            sortedValues[i++] = [parseFloat(sortedKeys[keyVal]), parseFloat(hashMap[sortedKeys[keyVal]])];
        });
        return sortedValues
    };

    this.zensSort = function(hashMap) {
        return Object.keys(hashMap).sort(
            function(a,b){
                return  a - b;
            }
        );
    };

    this.zDate = function(jsonObj) {
        var d = new Date(0);
        d.setUTCSeconds(jsonObj.date );
        d.setHours(d.getHours() + 1); // Fix timezone issue
        return d;
    };

    this.formatDay = function (d ){ return (d.getDate() < 9) ? "0" + d.getDate() : d.getDate();};

}
