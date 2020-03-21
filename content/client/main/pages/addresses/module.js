//states params -  
// also sets up my controllers 

; (function () {
    "use strict"

    angular.module("client.main.pages.addresses", ['ui.router', 'client.services'])

    angular.module("client.main.pages.addresses").config(RouteConfig) //configures my modules 

    RouteConfig.$inject = ["$stateProvider"]//inject this so url can be typed

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("main.addresses", {
                url: "/admin/addresses",
                abstract: true,
                views: {
                    "body@main": {
                        templateUrl: "client/main/pages/addresses/main.addresses.html"
                    }
                }
            })
            .state('main.addresses.list', {
                url: '/list',
                views: {
                    "addresses@main.addresses": {
                        component: "addressesList"
                    }
                },
                resolve: { //loads up in the view automatically
                    addresses: getAllAddresses,

                    //im going to start that function here so it can be invoked upon start up
                }
            })
            .state('main.addresses.detail', {
                url: '/details/:id',
                views: {
                    'addresses@main.addresses': {
                        //templateUrl: 'client/main/pages/addresses/detail/addresses.detail.html',
                        //controller: 'addressesDetailController as detailCtrl' this will no longer when i start using the component 
                        component: "addressesDetail"
                    }
                },
                resolve: { //loads up in the view automatically
                    states: read
                    //im going to start that function here so it can be invoked upon start up
                }
            })
    }

    getAllAddresses.$inject = ['addressesService']

    function getAllAddresses(addressesService) {
        return addressesService.read()
            .then(data => data.items)
    }
    // promise created from $q.resolve
    read.$inject = ['stateService']
    function read(stateService) {
        return stateService.read()

    }

})();
