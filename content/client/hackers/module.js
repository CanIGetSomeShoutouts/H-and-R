/* global angular */;
(function () {
    'use strict'

    angular.module('client.hackers', ['ui.router', 'client.services', 'client.react'])

    angular.module('client.hackers').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('main.hackers', {
                url: '/hackers',
                //can't directly navigate to this state
                abstract: true
            })
            .state('main.hackers.list', {
                url: '/list',
                views: {
                    'body@main': {
                        templateUrl: 'client/hackers/list/hacker.list.html',
                        controller: 'hackerListController as hackerCtrl'
                    }
                },
                resolve: {
                    hackers: getAllHackers
                }
            })
            .state('main.hackers.detail', {
                url: '/:id',
                views: {
                    'body@main': {
                        templateUrl: 'client/hackers/detail/hacker.detail.html',
                        controller: 'hackerDetailController as hackerCtrl'
                    }
                }
            })

            // the following use react components
            .state('main.hackers.reactList', {
                url: '/react-list',
                views: {
                    'body@main': {
                        // we want to use a react component. to do so we will use an angular component
                        // that knows how to load an react component. in order to make our use of ui
                        // router resolves easier and nicer, we can take advantage of the $resolve
                        // feature if we write our view as a 'template'. from angular's perspective, we're
                        // using just another angular component named 'reactLoader'. that component
                        // is told which react component told through a binding called "reactComponent".
                        template: '<react-loader props="$resolve" react-component="HackersList" />'
                    }
                },
                resolve: {
                    // as far as the hacker data itself that needs to be displayed on the page,
                    // for angular components we get the data in a resolve but for react components
                    // we let the component get the data so that it can "own" the data in its state.
                    // (otherwise it would be borrowed through props which we want to avoid whenever the
                    // component needs to change it, since we don't change props.) so, unlike the angular
                    // version we don't put the resolve for that data here.
                }
            })
            .state('main.hackers.reactDetail', {
                url: '/react-detail/:id',
                views: {
                    'body@main': {
                        template: '<react-loader props="$resolve" react-component="HackersDetail" />'
                    }
                },
                resolve: {
                    // whenever we need to get info from the $stateParams and the URL into the react
                    // component, we have to create a resolve to do so. one way to do that is as follows.
                    urlParams: getUrlParams,
                }
            })
    }

    getAllHackers.$inject = ['hackersService']

    function getAllHackers(hackersService) {
        return hackersService.read()
            .then(data => data.items)
    }

    getUrlParams.$inject = ['$stateParams']

    function getUrlParams($stateParams) {
        return {
            id: $stateParams.id
            // list any other params here
        }
    }
})();
