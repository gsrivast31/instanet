/*global Backbone, jQuery, _, ENTER_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// The Application
	// ---------------

	// Our overall **AppView** is the top-level piece of UI.
	app.ReminderListView = Backbone.View.extend({

		// Instead of generating a new element, bind to the existing skeleton of
		// the App already present in the HTML.
		el: '#reminderapp',

        // Delegated events for creating new items, and clearing completed ones.
		events: {
			'keypress #new-reminder': 'createOnEnter',
		},

		// At initialization we bind to the relevant events on the `reminders`
		// collection, when items are added or changed. Kick things off by
		// loading any preexisting reminders that might be saved in *localStorage*.
		initialize: function () {
			this.$input_title = this.$('#new-reminder');
			this.$input_date = this.$('#new-reminder-when');
			this.$main = this.$('#main');
			this.$list = $('#reminder-list');

			this.listenTo(app.reminders, 'add', this.addOne);
			this.listenTo(app.reminders, 'reset', this.addAll);
			this.listenTo(app.reminders, 'all', this.render);

			// Suppresses 'add' events with {reset: true} and prevents the app view
			// from being re-rendered for every model. Only renders when the 'reset'
			// event is triggered at the end of the fetch.
			app.reminders.fetch({reset: true});
		},

		// Re-rendering the App just means refreshing the statistics -- the rest
		// of the app doesn't change.
		render: function () {
			if (app.reminders.length) {
				this.$main.show();
			} else {
				this.$main.hide();
			}
		},

		// Add a single reminder item to the list by creating a view for it, and
		// appending its element to the `<ul>`.
		addOne: function (reminder) {
			var view = new app.ReminderView({ model: reminder });
			this.$list.append(view.render().el);
		},

		// Add all items in the **reminders** collection at once.
		addAll: function () {
			this.$list.html('');
			app.reminders.each(this.addOne, this);
		},

		// Generate the attributes for a new reminder item.
		newAttributes: function () {
			var selected_date = this.$input_date.val();
			if (selected_date) {
				var split_date = selected_date.split('-');
				selected_date = new Date(split_date[0], split_date[1], split_date[2]).toDateString();
			}
			return {
				title: this.$input_title.val().trim(),
				order: app.reminders.nextOrder(),
				date: selected_date,
				completed: false
			};
		},

		// If you hit return in the main input field, create new **reminder** model,
		// persisting it to *localStorage*.
		createOnEnter: function (e) {
			if (e.which === ENTER_KEY && this.$input_title.val().trim()) {
				app.reminders.create(this.newAttributes());
				this.$input_title.val('');
				this.$input_date.val(new Date());
			}
		},
	});
})(jQuery);
