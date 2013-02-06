/**
 * Sensor reader
 *
 * 2012, Jonas
 */
function ZensReader(util,  $http, plotter) {

    /**
     * Popluate sensor e1
     * @param domId the dom to plot to, remember that the dom needs to be finished before plotting.
     */
    var sensor_e1 = function(domId) {

        
        $http.get("/getEl").success(
            function(data) {
                // Plot graf per day
                plotter.plot(
                    [util.calculateDelta(parseDataPerHour(data.res, util.elHandle))],
                    $(util.idCreator(domId, "Day")),
                    ["Kw/h"],
                    [1, "hour"],
                    "%H",
                    util.zensTimeHash.today,
                    util.zensTimeHash.tomorrow,
                    0,
                    10,
                    "#F999000");
                
                // Plot graf per month
                plotter.plot(
                    [util.calculateDayDelta(parseDataPerDay(data.res, util.elHandle))],
                    $(util.idCreator(domId, "Month")),
                    ["Kw/h"],
                    [1, "day"],
                    "%d",
                    util.zensTimeHash.firstDayOfMonth,
                    util.zensTimeHash.nextMonth,
                    40,
                    120,
                    "#111000");

                /* Present daily price 
                 document.getElementById('price').innerHTML = "Compricer: " + data.price + " Kr/h";
                 document.getElementById('currprice').innerHTML = "Totalt idag: " +  util.priceCalculus(data.price, elhourDelta).toPrecision(2) + " Kr";
                 document.getElementById('monthprice').innerHTML = "Totalt denna m?nad: " +  util.priceCalculus(data.price, eldayDelta).toPrecision(6) + " Kr";
                 */

            });
    };

    /**
    * Popluate sensor t1
    * @param domId the dom to plot to, remember that the dom needs to be finished before plotting.
    */
    var sensor_t1 = function(domId) {

        $http.get("/getTemp").success(
            function(data){
                plotter.plot(
                    [util.orderHashSets(parseDataPerHour(data, util.tempHandle))],
                    $(util.idCreator(domId, "Day")),
                    ["C"],
                    [1, "hour"],
                    "%H",
                    util.zensTimeHash.today,
                    util.zensTimeHash.tomorrow,
                    10,
                    30,
                    '#fff000');
                plotter.plot(
                    [util.orderHashSets(parseDataPerDay(data, util.tempHandle))],
                    $(util.idCreator(domId, "Month")),
                    ["C"],
                    [1, "day"],
                    "%d",
                    util.zensTimeHash.today,
                    util.zensTimeHash.tomorrow,
                    10,
                    30,
                    '#fff000');
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
    
    return {
        s_e1: sensor_e1,
        s_t1: sensor_t1
    }

}
