angular.module('zens', []).
    directive('zenshead', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: {},
            templateUrl: 'partial/head.html',
            replace: true
        };
    }).
    directive('zensnav', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: {},
            templateUrl: 'partial/nav.html',
            replace: true
        };
    }).
    directive('zensgraf', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: { zensid: '@' },
            controller:
                function($scope, $element) {
                    $scope.apa = 'asdf';

                },
            templateUrl: 'partial/graf.html',
            replace: true
        };
    });
