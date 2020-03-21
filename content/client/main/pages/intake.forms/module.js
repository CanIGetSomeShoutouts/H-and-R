/* global angular */
; (function () {
    'use strict'

    // add crud moduled as dependencies to the array below.
    angular.module('client.main.pages.intakeForms', ['ui.router', 'client.services'])

    angular.module('client.main.pages.intakeForms').config(CreateintakeFormRoutes)

    CreateintakeFormRoutes.$inject = ['$stateProvider']

    // register client-side routes here, nested in "main" state.

    function CreateintakeFormRoutes($stateProvider) {
        $stateProvider
            .state('main.intakeForms', {
                url: '/admin/intake-forms',
                abstract: true,
                views: {
                    'body@main': {
                        templateUrl: 'client/main/pages/intake.forms/main.intake.forms.html'
                    }
                }
            })
            .state('main.intakeForms.list', {
                url: '/list',
                views: {
                    'intakeForms@main.intakeForms': {
                        component: 'intakeFormList'
                    }
                },
                resolve: {
                    intakeForms: getIntakeForms
                }
            })
            .state('main.intakeForms.detail', {
                url: '/details/:id',
                views: {
                    'intakeForms@main.intakeForms': {
                        component: 'intakeFormDetail'
                    }
                },
                resolve: {
                    intakeForms: getIntakeFormsByID,
                    traumaTypes: getTraumaTypes
                },
                params: {
                    id: null
                }
            })
    }

    getTraumaTypes.$inject = ['traumaTypesService']
    function getTraumaTypes(traumaTypesService) {
        return traumaTypesService.readPublished()
            .then(data => data.items)
            .catch(data => $log.log(`Error: ${data.errors}`))
    }

    getIntakeForms.$inject = ['intakeFormsService']
    function getIntakeForms(intakeFormsService) {
        return intakeFormsService.read()
            .then(data => data.items)
    }

    getIntakeFormsByID.$inject = ['intakeFormsService', '$stateParams', '$log']
    function getIntakeFormsByID(intakeFormsService, $stateParams, $log) {
        if ($stateParams.id) {
            return intakeFormsService.readById($stateParams.id)
                .then(data => {
                    return data.item
                })
                .catch(data => $log.log(`Error: ${data.errors}`))
        }
    }



})();



