
app.factory('zensGrafs', function () {
    return new Zens();
});

app.controller('ZensGraf',['$scope', 'zensGrafs',
    function (scope, zens) {
        scope.sensorType = 'el'

        scope.sensors =  function(sensor){
            if (sensor === 'e1'){
                scope.sensorType = 'el'
            }else if (sensor === 't1'){
                scope.sensorType = 'temp'
            }
        }
        zens.setup();
    }
]);

