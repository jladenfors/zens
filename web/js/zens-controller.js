app.factory('zensPlot', function(){
    return new ZensPlot();
});

app.factory('zensUtil', function(){
    return new ZensUtil();
});

app.factory('zensGrafs', ['zensUtil', '$http','zensPlot', function (zensUtil, http, plot) {
    return new ZensReader(zensUtil, http, plot);
}]);

app.controller('ZensGraf',['$scope', 'zensGrafs',
    function (scope, zens) {
        // the dot rule
        scope.parameters = {
            sensorId: "graphDiv"
        }

        scope.sensors =  {
            switcher: function(sensor){
                if (sensor === 'e1'){                    
                    zens.s_e1(scope.parameters.sensorId);
                }else if (sensor=== 't1'){
                    
                    zens.s_t1(scope.parameters.sensorId);
                }
            }
        }

        scope.onStartup = function(domid){
            console.log(domid)
            zens.s_e1(domid);
        }

    }
]);



