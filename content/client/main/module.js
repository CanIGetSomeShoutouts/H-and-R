/* global angular */
/* https://github.com/johnpapa/angular-styleguide/blob/master/a1/README.md#application-structure */

;
(function () {
    'use strict'
    angular.module('client.main', [
        // base / common - shared
        'client',
        'client.secondary',

        // view / controller sections
        'client.main.pages',
        'client.main.shared',

    ])

    angular.module('client.main')
        .run(fixUiSelect)
    fixUiSelect.$inject = ['$templateCache']
    function fixUiSelect($templateCache) {
        $templateCache.put('bootstrap/match.tpl.html', `<div class="ui-select-match" ng-hide="$select.open && $select.searchEnabled" ng-disabled="$select.disabled" ng-class="{'btn-default-focus':$select.focus}">
        <span tabindex="-1"
            class="btn form-control ui-select-toggle"
            aria-label="{{ $select.baseTitle }} activate"
            ng-disabled="$select.disabled"
            ng-click="$select.activate()"
            style="outline: 0;">
          <span ng-show="$select.isEmpty()" class="ui-select-placeholder text-muted">{{$select.placeholder}}</span>
          <span ng-hide="$select.isEmpty()" class="ui-select-match-text pull-left" ng-class="{'ui-select-allow-clear': $select.allowClear && !$select.isEmpty()}" ng-transclude=""></span>
          <i class="caret pull-right" ng-click="$select.toggle($event)"></i>
          <a ng-show="$select.allowClear && !$select.isEmpty() && ($select.disabled !== true)" aria-label="{{ $select.baseTitle }} clear" style="margin-right: 10px"
            ng-click="$select.clear($event)" class="btn btn-xs btn-link pull-right">
            <i class="glyphicon glyphicon-remove" aria-hidden="true"></i>
          </a>
        </span>
      </div>`)
    }

    angular.module('client.main').config(RouteConfig)
    angular.module('client.main').run(SetupCrossThemeReload)

    // RouteConfig
    RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider']

    function RouteConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            // This state may be used later to resolve data for the layout.
            .state('main', {
                abstract: true,
                views: {
                    'content@': {
                        component: 'mainLayout'
                    }
                }
            })
            .state("main.404", {
                views: {
                    'body@main': {
                        template: '<h1>404 Not Found</h1>'
                    }
                }
            })
        $urlRouterProvider.otherwise(otherwise)
        $locationProvider.html5Mode(true)
    }

    function otherwise($injector, $location) {
        const $state = $injector.get('$state')

        const fromAnon = $location.url() == "/" || $location.url().indexOf("/anon") == 0

        $state.go(fromAnon ? 'secondary.404' : 'main.404')
    }

    SetupCrossThemeReload.$inject = ['$transitions', '$window', '$log']

    function SetupCrossThemeReload($transitions, $window, $log) {
        $transitions.onStart({from:'main.**', to: 'secondary.**'}, reload)
        $transitions.onStart({ from: 'secondary.**', to: 'main.**' }, reload)

        function reload(transition) {
            $log.log('theme change detected. reloading...')
            $window.location.reload()
        }
    }

})();
