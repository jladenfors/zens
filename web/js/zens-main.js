
app.factory('zensGrafs', function () {
    return new Zens();
});

app.controller('ZensGraf',['$scope', 'zensGrafs',
    function (scope, zens) {
        
        scope.sensorId = 'el'
        
        scope.sensors =  function(sensor){            
            if (sensor === 'e1'){
                scope.sensorId = 'el'
            }else if (sensor === 't1'){
                scope.sensorId = 'temp'
            }
        }

        scope.alerter = function(){
            zens.setup();
        }
               
    }
]);



