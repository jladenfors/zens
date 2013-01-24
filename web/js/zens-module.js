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
            scope: { title: '@titles'},
            templateUrl: '/web/partial/nav.html',
            replace: true
        };
    }).
    directive('zensgraf', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: { zensid: '@'},            
            templateUrl: '/web/partial/graf.html',
            replace: true
        };
    }).directive('zensgrafs', function() {
        return {
            restrict: 'E',            
            templateUrl: '/web/partial/grafs.html',
            replace: true
        };
    });
