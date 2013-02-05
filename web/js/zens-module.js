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
            scope: {
                state:'@sensorType',
                diagram: '&'
            },
            templateUrl: '/web/partial/nav.html',
            replace: true
        };
    }).
    directive('zensgraf', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                zensid: '@',
                sensorId: '@',
                activeGraf: '&'
            },            
            templateUrl: '/web/partial/graf.html',            
            compile: function link(scope, iElement, iAttrs, controller) {
                return {
                    post: function postLink(scope, iElement, iAttrs, controller) {
                        // Start graf! 
                        scope.activeGraf();                       
                    }
                }
            },
            replace: true
        };
    }).directive('zensgrafs', function() {
        return {
            restrict: 'E',
            templateUrl: '/web/partial/grafs.html',
            require: '^ZensGraf',
            scope: {
                sensorId: '@',
                activeGraf: '&'                
            },
            replace: true
        };
    });

