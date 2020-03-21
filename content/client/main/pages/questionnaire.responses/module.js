/* global angular */ ;
(function() {
    "use strict"

    angular.module("client.main.pages.questionnaireResponses", ["ui.router", "client.services"])

    angular.module("client.main.pages.questionnaireResponses").config(RouteConfig)

    RouteConfig.$inject = ["$stateProvider"]

    function RouteConfig($stateProvider) {
        $stateProvider
            .state("main.questionnaireResponses", {
                abstract: true,
                url: "/admin/questionnaire-responses",
                views: {
                    "body@main": {
                        templateUrl: "client/main/pages/questionnaire.responses/questionnaire.responses.layout.html"
                    }
                }
            })
            .state("main.questionnaireResponses.list", {
                url: "/list",
                views: {
                    "questionnaireResponses@main.questionnaireResponses": {
                        component: "questionnaireResponsesList"
                    }
                },
                resolve: {
                    questionnaireResponses: getAllQuestionnaireResponses
                }
            })
            .state("main.questionnaireResponses.detail", {
                url: "/detail/:id",
                resolve: {
                    questionnaireResponseData: getDataById
                },
                params: {
                    id: null
                },
                views: {
                    "questionnaireResponses@main.questionnaireResponses": {
                        component: "questionnaireResponsesDetail"
                    }
                }
            })
    }

    getDataById.$inject = ["questionnaireResponsesService", "$stateParams", "$log"]
    getAllQuestionnaireResponses.$inject = ["questionnaireResponsesService"]

    function getDataById(questionnaireResponsesService, $stateParams, $log) {
        if ($stateParams.id) {
            return questionnaireResponsesService.readById($stateParams.id)
                .then(data => data.item)
                .catch(data => $log.log(`Error: ${data.errors}`))
        }
    }

    function getAllQuestionnaireResponses(questionnaireResponsesService) {
        return questionnaireResponsesService.readAll()
            .then(data => data.items)
    }
})();
