/* global angular */
; (function () {
    'use strict'

    angular.module('client.main.pages.supportPosts', ['ui.router', 'client.services'])

    angular.module('client.main.pages.supportPosts').config(RouteConfig)

    RouteConfig.$inject = ['$stateProvider']

    function RouteConfig($stateProvider) {
        $stateProvider
            .state('main.supportPosts', {
                url: '/admin/support-posts',
                abstract: true,
                views: {
                    'body@main': {
                        templateUrl: 'client/main/pages/support.posts/support.posts.html'
                    }
                }
            })
            .state('main.supportPosts.list', {
                url: '/list',
                views: {
                    'supportPosts@main.supportPosts': {
                        component: 'supportPostsList'
                    }
                },
                resolve: {
                    supportPosts: getAllPosts
                }
            })
            .state('main.supportPosts.detail', {
                url: '/detail/:id',
                params: { id: null },
                views: {
                    'supportPosts@main.supportPosts': {
                        component: 'supportPostsDetail'
                    }
                },
                resolve: {
                    supportPost: getSinglePost,
                    supporters: readSupporters,
                    therapists: readTherapists,
                    clients: readClients,
                }
            })
    }


    getAllPosts.$inject = ['supportPostsService', '$log']
    getSinglePost.$inject = ['supportPostsService', '$stateParams', '$log']
    readSupporters.$inject = ['usersService', '$log']
    readTherapists.$inject = ['usersService', '$log']
    readClients.$inject = ['usersService', '$log']


    function getAllPosts(supportPostsService, $log) {
        return supportPostsService.read()
            .then(data => data.items)
            .catch(data => $log.log(`Error: ${data.errors}`))
    }


    function getSinglePost(supportPostsService, $stateParams, $log) {
        if ($stateParams.id) {
            return supportPostsService.readById($stateParams.id)
                .then(data => { return data.item })
                .catch(data => $log.log(`Error: ${data.errors}`))
        } else {
            return
        }
    }

    function readSupporters(usersService, $log) {
        return usersService.readSupporters()
            .then(data => data.items)
            .catch(data => $log.log(`Error: ${data.errors}`))
    }


    function readTherapists(usersService, $log) {
        return usersService.readTherapists()
            .then(data => data.items)
            .catch(data => $log.log(`Error: ${data.errors}`))
    }

    function readClients(usersService, $log) {
        return usersService.readClients()
            .then(data => data.items)
            .catch(xhr => $log.log(`Error: ${data.errors}`))
    }



})();
