requirejs.config({
    shim: {
        'lib/jquery.flot': [],
        'reader/zens-flot': ['lib/jquery.flot'],
        'reader/zens-util': [],
        'reader/zens-reader': ['reader/zens-util', 'reader/zens-flot'],
        'zens-module': ['zens-controller'],                
        'zens-controller': ['start'],
        'start': ['lib/angular.min']
    }
});

require(['zens-module', 'reader/zens-reader'], 
    function main() {
        // Late bootstrap for require to work
        angular.bootstrap(document, ['zens']);        
    });
