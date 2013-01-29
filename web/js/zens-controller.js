// This is the handle for our application, a global handle! 
var app = angular.module('zens', []);

// Define the module
app.factory('zensPlot', function () {
    return function(){
        return "jonas";
    }
});

var myModule = angular.module('myModule', []);
myModule.factory('serviceId', function() {
    var shinyNewServiceInstance;
    //factory function body that constructs shinyNewServiceInstance
    return shinyNewServiceInstance;
});

app.controller('ZensGraf',['$scope', 'zensPlot',
    function (scope, zplot) {
        scope.sensorType = 'el'

        scope.sensors =  function(sensor){
            if (sensor === 'e1'){
                scope.sensorType = 'el'
            }else if (sensor === 't1'){
                scope.sensorType = 'temp'
            }
        }
    }
]);
