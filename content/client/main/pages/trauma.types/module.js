/* global angular */ ;
(function() {
    'use strict'

    // Add crud modules as dependencies to the array below.
    // Truama type controllers will go into this module
    angular.module('client.main.pages.trauma.types', ['ui.router', 'client.services', 'ui.validate'])

    // This is configuring the module by using routes 
    angular.module('client.main.pages.trauma.types').config(RouteConfig)
    // module configuration configures the states 
    // set up states to type urls to browsers to have content get uploaded 
    RouteConfig.$inject = ['$stateProvider']
    //ui seperates pages into common portions
    function RouteConfig($stateProvider) {
        $stateProvider
            //this state is going to populate the content ui view with the template url html 
            .state('main.traumaTypes', {
                abstract: true,
                url: '/admin/trauma-types',
                views: {
                    //each property has to have names that refer to ui views
                    'body@main': {
                        templateUrl: 'client/main/pages/trauma.types/main.trauma.types.html',
                    }
                },
                //needs a view that's going to connect everything together
            })
            .state('main.traumaTypes.list', {
                url: '/list',
                views: {
                    'traumaTypes@main.traumaTypes': {
                        component: 'traumaTypesList'
                    }
                },
                // you can have multiple properties in the resolve
                // the value of this property is a function defined below
                resolve: {
                    traumaTypes: getAllTraumaTypes
                }
            })
            .state('main.traumaTypes.details', {
                url: '/details/:id',
                views: {
                    'traumaTypes@main.traumaTypes': {
                        component: 'traumaTypesDetail'
                    }
                }
            })
    }
    getAllTraumaTypes.$inject = ['traumaTypesService']

    function getAllTraumaTypes(traumaTypesService, $log) {
        return traumaTypesService.read()
            .then(data => data.items)
    }
    // register client-side routes here, nested in "main" state.
})();
