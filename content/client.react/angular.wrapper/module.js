"use strict"

if (angular) {
    // This module will get injected to our 'client.pages.*' module.js
    angular.module('client.react', [])
}

// importing for browserify
require("./react.component.registry")
require("./react.loader")
