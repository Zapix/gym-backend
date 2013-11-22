require.config({
    paths:{
        'jquery': 'bower_components/jquery/jquery.min',
        'jqm': 'bower_components/jquery-mobile-bower/js/jquery.mobile-1.3.2.min',
        'backbone': 'bower_components/backbone/backbone-min',
        'underscore': 'bower_components/underscore/underscore-min',
        'index': 'index'
    },
    shim:{
        'backbone':{
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore':{
            exports: '_'
        },
        'index':{
            exports: 'app'
        }
    }
});
require(['backbone', 'index', 'myjs/routers'], function(Backbone, app, ApplicationRouter){
    $(document).on('mobileinit', function(){
        console.log('Mobile init');
        $.mobile.ajaxEnabled = false;
        $.mobile.linkBindingEnabled = false;
        $.mobile.hashListeningEnabled = false;
        $.mobile.pushStateEnabled = false;

        // Remove page from DOM when it's being replaced
        $('body').on('pagehide', 'div[data-role="page"]', function (event, ui) {
            $(event.currentTarget).remove();
        });
    });

    require(['jqm'], function(){
        console.log("Application Start");
        $.ajaxSetup({
            crossDomain: true
        });

        this.router = new ApplicationRouter();
        Backbone.history.start();
        app.initialize();
    });
});
