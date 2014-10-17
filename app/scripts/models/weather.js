/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Todo Model
	// ----------

	// Our basic **Todo** model has `title`, `order`, and `completed` attributes.
	app.Weather = Backbone.Model.extend({
		// Default attributes for the todo
		// and ensure that each todo created has `title` and `completed` keys.
		defaults: {
			location: '',
            woeid: '',
            unit: ''
		},
        // Save all of the todo items under the `"weather"` namespace.
		localStorage: new Backbone.LocalStorage('instanet-weather')
	});
})();
