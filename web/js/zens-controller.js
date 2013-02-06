app.factory('zensUtil', function(){
    return new ZensUtil();
});

app.factory('zensGrafs', ['zensUtil', '$http', function (zensUtil, http) {    
    return new ZensReader(zensUtil, http);
}]);

app.controller('ZensGraf',['$scope', 'zensGrafs',
    function (scope, zens) {
        
        scope.sensorId = 'elGraph'
        
        scope.sensors =  function(sensor){
            if (sensor === 'e1'){
                scope.sensorId = 'elGraph'
                zens.s_e1(scope.sensorId);
            }else if (sensor === 't1'){
                scope.sensorId = 'elGraph'
                zens.s_t1(scope.sensorId);
            }            
        }

        scope.onStartup = function(domid){
            zens.s_e1(domid);
        }
               
    }
]);



