requirejs.config({
    shim: {
        'jquery.flot': [],
        'zens-flot': ['jquery.flot'],
        'Zens': ['zens-flot'],
        'zens-module': ['zens-main'],                
        'zens-main': ['start'],
        'start': ['angular.min']
    }
});

require(['zens-module', 'Zens'], 
    function main() {
        var $injector = angular.bootstrap(document, ['zens']);        
    });
