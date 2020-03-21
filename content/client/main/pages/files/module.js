/* global angular */
;(function(){
    'use strict'

    angular.module('client.main.pages.files', ['ui.router', 'client.services', 'client.directives'])
    
    angular.module('client.main.pages.files').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider){
        $stateProvider
            .state('main.file-test', {
                url: '/admin/files',
                views: {
                    'body@main':{
                        component: 'files'
                    }
                }               
            })
    }  
})();