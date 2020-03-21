/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure */

;
(function () {
    'use strict'
    angular.module('client', [
        // 3rd party
        'ui.router',
        'ui.bootstrap',
        'ae-datetimepicker',
        'NgSwitchery',
        'ngAutocomplete',
        'ui.select',
        'summernote',
        'ngSanitize',
        'ui.validate',
        'ui.slimscroll',
        'ngMask',

        // shared

        'client.constants',
        'client.services',
        'client.filters',
        'client.directives',

        // sample view / controller
        'client.hackers'
    ])

    angular.module('client')
        .run(StateErrorHandler)

    // StateErrorHandler
    StateErrorHandler.$inject = ['$rootScope', '$log']

    function StateErrorHandler($rootScope, $log) {
        $rootScope.$on('$stateChangeError', info => $log.log(info))
    }

})();
