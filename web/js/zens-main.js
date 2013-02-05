
app.factory('zensGrafs', function () {
    return new Zens();
});

app.controller('ZensGraf',['$scope', 'zensGrafs',
    function (scope, zens) {
        
        scope.sensorId = 'elGraph'
        
        scope.sensors =  function(sensor){
            if (sensor === 'e1'){
                scope.sensorId = 'elGraph'
                zens.sensor_e1(scope.sensorId);
            }else if (sensor === 't1'){
                scope.sensorId = 'elGraph'
                zens.sensor_t1(scope.sensorId);
            }            
        }

        scope.onStartup = function(domid){
            zens.sensor_e1(domid);
        }
               
    }
]);



