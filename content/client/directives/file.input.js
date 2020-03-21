/* global angular */
/* This Directive allows Angular to read files from inputs */
; (function () {
    "use strict"

    angular.module('client.directives').directive('fileInput', FileInput)

    FileInput.$inject = ['$parse']

    function FileInput($parse) {

        function inputHandler(scope, element, attributes) {
            element.on('change', function () {
                $parse(attributes.fileInput)
                    .assign(scope, element[0].files)
                scope.$apply(attributes.onChange)
            })
        }

        return {
            restrict: 'A',
            link: inputHandler
        }
    }
})();