/* global angular */;
(function () {
    'use strict'

    angular.module('client.main.pages.questionnaireResponses')
        .controller('questionnaireResponsesListController', QuestionnaireResponsesListController)

    QuestionnaireResponsesListController.$inject = ['questionnaireResponsesService', '$log', 'uiNotificationsService']

    function QuestionnaireResponsesListController(questionnaireResponsesService, $log, uiNotificationsService) {
        const vm = this

        vm.questionnaire = {}
        vm.questionnaireResponses = null
        vm.confirmDeactivate = _confirmDeactivate
        vm.$onInit = $init

        function $init() {
            vm.questionnaireResponses = vm.questionnaireResponses
        }

        function _confirmDeactivate($index) {
            uiNotificationsService.confirm('Are you sure you want to delete this questionnaire response?', 'Yes, delete', 'No, cancel')
                .then(response => {
                    if (response) {
                        return _deactivateData($index)
                    }
                })
        }

        function _deactivateData($index) {
            questionnaireResponsesService.deactivateData(vm.questionnaireResponses[$index]._id)
                .then(data => {
                    // Remove the questionnaire response from the DOM
                    vm.questionnaireResponses.splice($index, 1)
                    uiNotificationsService.success('Questionnaire response successfully deleted.')
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to delete the questionnaire response.')
                })
        }
    }

    // NOTE: the name of the component turns into kebab-case in html side
    angular.module('client.main.pages.questionnaireResponses').component('questionnaireResponsesList', {
        templateUrl: 'client/main/pages/questionnaire.responses/list/questionnaire.responses.list.html',
        controller: 'questionnaireResponsesListController',
        bindings: {
            questionnaireResponses: '<'
        }
    })
})()
