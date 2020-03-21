; (function () {
	'use strict'

	angular.module('client.constants')
		.constant('summernoteToolbar', {
			toolbar: [
				['style', ['style']],
				['font', ['bold', 'italic', 'underline', 'clear']],
				['fontname', ['fontname']],
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['height', ['height']],
				['table', ['table']],
				['insert', ['link', 'picture', 'hr']],
				['view', ['fullscreen']],
				['help', ['help']]
			]
		})



})();