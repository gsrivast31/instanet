/*global Backbone */
var app = app || {};

(function () {
	'use strict';

	// Reminder Collection
	// ---------------

	// The collection of reminders is backed by *localStorage* instead of a remote
	// server.
	var Reminders = Backbone.Collection.extend({
		// Reference to this collection's model.
		model: app.Reminder,

		// Save all of the reminders items under the `"instanet-reminder"` namespace.
		localStorage: new Backbone.LocalStorage('instanet-reminder'),

		// Filter down the list of all reminders items that are finished.
		completed: function () {
			return this.where({completed: true});
		},

		// Filter down the list to only reminders items that are still not finished.
		remaining: function () {
			return this.where({completed: false});
		},

		// We keep the reminders in sequential order, despite being saved by unordered
		// GUID in the database. This generates the next order number for new items.
		nextOrder: function () {
			return this.length ? this.last().get('order') + 1 : 1;
		},

		// reminders are sorted by their original insertion order.
		comparator: 'order'
	});

	// Create our global collection of **Reminders**.
	app.reminders = new Reminders();
})();
