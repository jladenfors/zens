app.directive('zenshead', function() {
    return {
        restrict: 'E',
        transclude: true,
        scope: {},
        templateUrl: '/web/partial/head.html',
        replace: true
    };
}).
    directive('zensnav', function() {
        return {
            restrict: 'E',
            transclude: true,            
            templateUrl: '/web/partial/nav.html',
            replace: true
        };
    }).
    directive('zensgrafs', function() {
        return {
            restrict: 'E',
            templateUrl: '/web/partial/grafs.html',                        
            replace: true
        };
    }).
    directive('zensgraf', function() {
        return {
            restrict: 'E',
            transclude: true,            
            scope: {
                grafId: '@'                
            },
            templateUrl: '/web/partial/graf.html',            
            replace: true
        };
    });

