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

    directive('zensnavItem', function(){
        return {
            restrict: 'E',
            // This HTML will replace the zippy directive.
            replace: true,
            transclude: true,
            scope: { title:'@zensItem=' },           
            template: '<div>' +
                '<div class="title">{{title}}</div>' +
                '<div class="body" ng-transclude></div>' +
                '</div>',
            // The linking function will add behavior to the template
            link: function(scope, element, attrs) {
                // Title element
                var title = angular.element(element.children()[0]),
                // Opened / closed state
                    opened = true;

                // Clicking on title should open/close the zippy
                title.bind('click', toggle);

                // Toggle the closed/opened state
                function toggle() {
                    opened = !opened;
                    element.removeClass(opened ? 'closed' : 'opened');
                    element.addClass(opened ? 'opened' : 'closed');
                }

                // initialize the zippy
                toggle();
            }
        }
    }).
    directive('zensnav', function() {
        return {
            restrict: 'E',
            transclude: true,
            scope: {},
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
