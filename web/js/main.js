requirejs.config({
    shim: {
        'jquery.flot': [],
        'zens-flot': ['jquery.flot'],
        'zens-reader': ['zens-util', 'zens-flot'],
        'zens-module': ['zens-controller'],                
        'zens-controller': ['start'],
        'start': ['angular.min']
    }
});

require(['zens-module', 'zens-reader'], 
    function main() {
        // Late bootstrap for require to work
        angular.bootstrap(document, ['zens']);        
    });
