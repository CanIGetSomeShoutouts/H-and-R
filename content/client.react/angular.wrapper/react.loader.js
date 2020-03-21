const ReactDOM = require('react-dom')
const React = require('react')
const reactComponentRegistry = require('./react.component.registry')

// angular component that knows how to load a react component. based on work by
// instructor dan. thanks, dan!

// react.loader will only run while angular exists
if (angular) {
    "use strict"

    let previous = {}

    // Gives the module "client.react" a component called "reactLoader" with a controller and bindings property
    angular.module("client.react").component("reactLoader", {
        controller: ReactComponentController,
        // bindings property will recieve the React Component (as a string because of "@")
        bindings: {
            reactComponent: "@",
            props: "<"
        }
    })

    ReactComponentController.$inject = ["$element", "$location", "$scope", '$log', '$state']

    function ReactComponentController($element, $location, $scope, $log, $state) {
        const vm = this

        let elem = $element[0]
        let mounted = false
        let detachTimeout
        vm.$onChanges = onChanges
        vm.$onDestroy = onDestroy

        function url(newUrl) {
            $location.url(newUrl)
            $scope.$apply()
        }

        function onDestroy() {
            if (mounted) {
                $log.log('preserving current')
                const uiView = elem.parentElement.attributes['ui-view'].value
                previous[uiView] = {
                    stateName: $state.current.name,
                    reactComponent: vm.reactComponent,
                    element: elem
                }
            }
        }

        function onChanges(changes) {

            if (elem.parentElement.attributes['ui-view']) {
                const uiView = elem.parentElement.attributes['ui-view'].value

                if (previous[uiView]) {
                    $log.log('restoring previous')
                    if (vm.reactComponent == previous[uiView].reactComponent && $state.current.name == previous[uiView].stateName) {
                        angular.element(elem.parentElement).append(previous[uiView].element)
                        angular.element(elem).remove()
                        elem = previous[uiView].element
                    }
                    else {
                        $log.log('unmounting previous')
                        ReactDOM.unmountComponentAtNode(previous[uiView].element)
                    }
                    delete previous[uiView]
                }
            }

            if (!vm.props) { vm.props = {} }
            vm.props.angularUrl = url

            let fn
            if (vm.reactComponent && (fn = reactComponentRegistry[vm.reactComponent])) {
                ReactDOM.render(React.createElement(fn, vm.props, null), elem)
                mounted = true
                return
            }
            ReactDOM.unmountComponentAtNode(elem)
        }
    }
}