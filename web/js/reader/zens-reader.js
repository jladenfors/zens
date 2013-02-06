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


        var elhourDelta = {};
        var eldayDelta = {};

        $http.get("/getEl").success(function(data) {
            var elhourHash = {};
            var eldayHash = {};

            data.res.forEach(
                function (reply, i) {
                    var json = reply;
                    var eventDate = util.zDate(json);
                    if (new Date().getDate() == eventDate.getDate()){
                        elhourHash[eventDate.getTime()] = json.data/1000;
                    }
                    if (new Date().getMonth() == eventDate.getMonth()) {
                        eldayHash[eventDate.getTime()] = json.data/1000;
                    }
                }
            );

            elhourDelta = util.calculateDelta(elhourHash);
            eldayDelta = util.calculateDayDelta(eldayHash);
            // Present daily price 
            document.getElementById('price').innerHTML = "Compricer: " + data.price + " Kr/h";
            document.getElementById('currprice').innerHTML = "Totalt idag: " +  util.priceCalculus(data.price, elhourDelta).toPrecision(2) + " Kr";
            document.getElementById('monthprice').innerHTML = "Totalt denna m?nad: " +  util.priceCalculus(data.price, eldayDelta).toPrecision(6) + " Kr";
            zensPlot([elhourDelta], $("#"+domId), ["Kw/h"], [1, "hour"], "%H", util.zensTimeHash.today, util.zensTimeHash.tomorrow, 0, 30, "#F999000");
            console.log("#"+domId+"Day")
            zensPlot([eldayDelta], $("#"+domId+"Day"), ["Kw/h"], [1, "day"], "%d", util.zensTimeHash.firstDayOfMonth, util.zensTimeHash.nextMonth, 0, 120, "#111000");
        });
    };

    var sensor_t1 = function(domId) {

        var temphourHash = {};
        var tempdayHash = {};

        $.ajax({
            type: "GET",
            url: "/getTemp",
            async: false,
            success: function(data){
                data.forEach(
                    function (reply, i) {
                        var json = reply;
                        var d = util.zDate(json);
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

        zensPlot([util.orderHashSets(temphourHash)], $("#"+domId), ["C"], [1, "hour"], "%H", util.zensTimeHash.today, util.zensTimeHash.tomorrow, 0, 30);
        // zensPlot([elMonthly], $("#"+domId), ["C"], [1, "day"], "%d", zensTimeHash.firstDayOfMonth, zensTimeHash.nextMonth, 0, 120);
    };



    return {
        s_e1: sensor_e1,
        s_t1: sensor_t1
    }

}
