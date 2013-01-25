angular.module('zens', []).
    directive('zenshead', function() {
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
                sensorId: '@'
                },            
            templateUrl: '/web/partial/graf.html',
            replace: true
        };
    }).directive('zensgrafs', function() {
        return {
            restrict: 'E',            
            templateUrl: '/web/partial/grafs.html',
            scope: {
                grafType: '@'
            },
            replace: true
        };
    });
