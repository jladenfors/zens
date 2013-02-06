/**
 * Sensor reader
 *
 * 2012, Jonas
 */
function ZensReader(util,  $http ) {

    /**
     * Popluate sensor e1
     * @param domId
     */
    var sensor_e1 = function(domId) {

        $http.get("/getEl").success(
            function(data) {
                // Plot graf per day
                zensPlot(
                    [util.calculateDelta(parseDataPerHour(data.res, elHandle))],
                    $(idCreator(domId, "Day")),
                    ["Kw/h"],
                    [1, "hour"],
                    "%H",
                    util.zensTimeHash.today,
                    util.zensTimeHash.tomorrow,
                    0,
                    30,
                    "#F999000");
                // Plot graf per month
                zensPlot(
                    [util.calculateDayDelta(parseDataPerDay(data.res, elHandle))],
                    $(idCreator(domId, "Month")),
                    ["Kw/h"],
                    [1, "day"],
                    "%d",
                    util.zensTimeHash.firstDayOfMonth,
                    util.zensTimeHash.nextMonth,
                    0,
                    120,
                    "#111000");

                /* Present daily price 
                 document.getElementById('price').innerHTML = "Compricer: " + data.price + " Kr/h";
                 document.getElementById('currprice').innerHTML = "Totalt idag: " +  util.priceCalculus(data.price, elhourDelta).toPrecision(2) + " Kr";
                 document.getElementById('monthprice').innerHTML = "Totalt denna m?nad: " +  util.priceCalculus(data.price, eldayDelta).toPrecision(6) + " Kr";
                 */

            });
    };

    var parseDataPerHour = function (data, dataHandle){
        var hourHash = {};
        data.forEach(
            function (reply, i) {
                var json = reply;
                var eventDate = util.zDate(json);
                if (new Date().getDate() == eventDate.getDate()){
                    hourHash[eventDate.getTime()] = dataHandle(json.data);
                }
            }
        );
        return hourHash;
    };

    var parseDataPerDay = function (data, dataHandle){
        var dayHash = {};
        data.forEach(
            function (reply, i) {
                var json = reply;
                var eventDate = util.zDate(json);
                if (new Date().getMonth() == eventDate.getMonth()) {
                    dayHash[eventDate.getTime()] = dataHandle(json.data);
                }
            }
        );
        return dayHash;
    };

    var idCreator = function(domId, suffix){
        return "#"+domId+suffix
    }

    var elHandle = function(data){
        return data/1000;
    }

    var tempHandle = function(data){
        parseFloat(data).toFixed(1)
    }

    var sensor_t1 = function(domId) {

        $http.get("/getTemp").success(
            function(data){                
                zensPlot(
                    [util.orderHashSets(parseDataPerHour(data, tempHandle))],
                    $(idCreator(domId, "Day")),
                    ["C"], 
                    [1, "hour"], 
                    "%H", 
                    util.zensTimeHash.today, 
                    util.zensTimeHash.tomorrow, 
                    0, 
                    30,
                    '#fff000');                
                zensPlot(
                    [util.orderHashSets(parseDataPerHour(data, tempHandle))],
                    $(idCreator(domId, "Month")),
                    ["C"], 
                    [1, "hour"], 
                    "%H", 
                    util.zensTimeHash.today, 
                    util.zensTimeHash.tomorrow, 
                    0, 
                    30, 
                    '#fff000');
            });
    };


    return {
        s_e1: sensor_e1,
        s_t1: sensor_t1
    }

}
