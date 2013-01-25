function ZensGraf($scope) {
   $scope.sensorType = 'el'
   
    $scope.sensors =  function(sensor){        
        if (sensor === 'e1'){
            $scope.sensorType = 'el'
        }else if (sensor === 't1'){
            $scope.sensorType = 'temp'
        }
    }
    
    
}