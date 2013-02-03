requirejs.config({
    shim: {
        'jquery.flot': [],
        'zens-flot': ['jquery.flot'],
        'Zens': ['zens-flot'],
        'zens-main': ['zens-module', 'Zens'],                
        'zens-module': ['start'],
        'start': ['angular.min']
    }
});

require([ 'zens-main'], 
    function main() {               
        app.factory('zensFlot', function () {
            return new Zens();
        });
        // delayed bootstrap of anuglar
        angular.bootstrap(document, ['zens']);

    });
