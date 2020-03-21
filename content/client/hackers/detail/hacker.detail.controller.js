/* global angular */
;(function() {
    'use strict'

    angular.module('client.hackers')
        .controller('hackerDetailController', HackerDetailController)

    HackerDetailController.$inject = ['hackersService', '$stateParams', '$log']

    function HackerDetailController(hackersService, $stateParams, $log) {
        const vm = this
        vm.tagline = null
        vm.hacker = null
        
        init()
        function init() {
            vm.tagline = 'Hack The Planet!'

            if ($stateParams.id) {
                hackersService.readById($stateParams.id)
                    .then(data =>vm.hacker = data.item)
                    .catch(data => $log.log(`Error: ${data.errors}`))
            }
        }
    }
})()