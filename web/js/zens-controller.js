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
        
        scope.sensorId = 'graphDiv'
        
        scope.sensors =  function(sensor){
            if (sensor === 'e1'){
                scope.sensorId = 'graphDiv'
                zens.s_e1(scope.sensorId);
            }else if (sensor === 't1'){
                scope.sensorId = 'graphDiv'
                zens.s_t1(scope.sensorId);
            }            
        }
        
        scope.onStartup = function(domid){
            zens.s_e1(domid);
        }
               
    }
]);



