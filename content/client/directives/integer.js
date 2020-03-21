/* global angular */
/* NOTE: Notes on custom directives
    You can add your own validation functions to $validators object on ngModelController
    This directive validates angular form inputs if it's an integer type
*/
;
(function() {
    'use strict'

    const INTEGER_REGEXP = /^-?\d+$/ // Regex to validate in the integer directive
    angular.module('client.directives').directive('integer', _Integer)

    function _Integer() {
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                // NOTE: Each function in $validators receives the modelValue and viewValue as parameters
                ctrl.$validators.integer = function(modelValue, viewValue) {
                    if (ctrl.$isEmpty(modelValue)) {
                        // Empty models will be considered valid
                        return true
                    } else if (INTEGER_REGEXP.test(viewValue)) {
                        // This will return true if viewValue is valid
                        return true
                    } else {
                        // Otherwise return false
                        return false
                    }
                }
            }
        }
    }
})();
