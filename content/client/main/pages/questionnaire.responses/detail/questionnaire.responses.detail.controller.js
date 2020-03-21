/* global angular */;
(function () {
    'use strict'

    angular.module('client.main.pages.questionnaireResponses')
        .controller('questionnaireResponsesDetailController', QuestionnaireResponsesDetailController)

    QuestionnaireResponsesDetailController.$inject = ['questionnaireResponsesService', '$stateParams', '$state', '$log', 'uiNotificationsService']

    function QuestionnaireResponsesDetailController(questionnaireResponsesService, $stateParams, $state, $log, uiNotificationsService) {
        const vm = this

        vm.formData = null

        vm.onSaveBtn = _onSaveBtn
        vm.addAnswer = _addAnswer
        vm.removeAnswer = _removeAnswer

        vm.$onInit = $init

        function $init() {
            vm.formData = vm.questionnaireResponseData
            // If there's no data to grab from questionnaireResponsData, initialize formData
            if (!vm.formData) {
                vm.formData = {}
                vm.formData.answers = []
                vm.formData.answers.answerIndices = []
                vm.formData.dateCreated = null
                vm.formData.dateModified = null
                vm.formData.dateDeactivated = null
            }
        }

        function _removeAnswer($index) {
            uiNotificationsService.confirm('Are you sure you want to delete this answer?', 'Yes, delete', 'No, cancel')
                .then(response => {
                    if (response) {
                        vm.formData.answers.splice($index, 1)
                    }
                })
        }

        function _addAnswer() {
            let newAnswer = {
                questionIndex: 0,
                answerIndices: [],
                text: null
            }
            vm.formData.answers.unshift(newAnswer) // Add to beginning of the array
        }

        function _onSaveBtn() {
            // Check if form is invalid
            if (vm.questionnaireResponsesForm.$invalid) {
                return
            }

            // If there's an id in url, use update()
            if ($stateParams.id) {
                _formatAnswerIndices()
                _update()
            } else {
                // answerIndices are being parsed as a string.  Format it to be an array of numbers
                _formatAnswerIndices()
                _create()
            }
        }

        // Format vm.formData.answers.answerIndices
        function _formatAnswerIndices() {
            for (let index = 0; index < vm.formData.answers.length; index++) {
                // NOTE: In the beginning, new answerIndices will be a string value so we have to convert them into array of numbers
                if (typeof vm.formData.answers[index].answerIndices === 'string' && vm.formData.answers[index].answerIndices !== '') {
                    // split() is for getting all the elements from the string value.  
                    // slice() is to make a 'true' copy of the array and putting it to the answerIndices property
                    vm.formData.answers[index].answerIndices = vm.formData.answers[index].answerIndices.split(',').slice(0)

                    let numArray = []
                    for (let answerIndex of vm.formData.answers[index].answerIndices) {
                        numArray.push(parseInt(answerIndex))
                    }
                    // Re-assign the new array
                    vm.formData.answers[index].answerIndices = numArray.slice(0)
                }
            }
        }

        function _create() {
            questionnaireResponsesService.create(vm.formData)
                .then(data => {
                    uiNotificationsService.success('Questionnaire response successfully created.')
                    $state.go('main.questionnaireResponses.list')
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to create the questionnaire response.')
                })
        }

        function _update() {
            questionnaireResponsesService.update(vm.formData)
                .then(data => {
                    uiNotificationsService.success('Questionnaire response successfully updated.')
                    $state.go('main.questionnaireResponses.list')
                })
                .catch(data => {
                    $log.log(`Error: ${data.errors}`)
                    uiNotificationsService.error('An error occurred while attempting to update the questionnaire response.')
                })
        }
    }

    angular.module('client.main.pages.questionnaireResponses').component('questionnaireResponsesDetail', {
        templateUrl: 'client/main/pages/questionnaire.responses/detail/questionnaire.responses.detail.html',
        controller: 'questionnaireResponsesDetailController',
        bindings: {
            questionnaireResponseData: '<'
        }
    })
})()
