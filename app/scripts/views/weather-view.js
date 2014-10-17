/*global Backbone, jQuery, _, ENTER_KEY, ESC_KEY */
var app = app || {};

(function ($) {
	'use strict';

	// Weather View
	// --------------

	// The DOM element for weather...
	app.WeatherView = Backbone.View.extend({
        attributes: { id: 'weather', class: 'metric' },
        el: '#weather_widget',
        template: InstaNet.Templates['/scripts/templates/weather'],
        events: {
            "dblclick .location" : "editLocation",
            "keypress .location": "onKeypress",
            "keydown .location": "onKeydown",
            "blur .location": "saveLocation",
            "webkitAnimationEnd .location": "onAnimationEnd"
        },
        initialize: function (options) {
            this.options = options || {};
            // consolidate the top two listeners when we move to 1.0 and test toggle unit (I think that's the problem)
            this.listenTo(this.model, 'change:updated', this.render);
            this.listenTo(this.model, 'change:manualLocation', this.updateWeather);
            this.updateWeather();
            this.render();
            this.updateTime();

            var weatherTimer = setInterval(function () {
                this.updateWeather();
            }.bind(this), 600000);


            setInterval( function() {
                this.updateSeconds();
            }.bind(this),1000);
                
            setInterval( function() {
                this.updateMinutes();
            }.bind(this),1000);
                
            setInterval( function() {
                this.updateHours();
            }.bind(this), 1000);   
        },
        render: function() {
            var variables = { 
                temperature: this.model.get('temperature'), 
                location: this.model.get('location'), 
                unit: this.model.get('unit'), 
                condition: this.model.get('condition'), 
                forecast_1: this.model.get('forecast_1'),
                forecast_2: this.model.get('forecast_2'),
                forecast_3: this.model.get('forecast_3')
            };

            var order = (this.options.order  || 'append') + 'To';
            this.$el.html(this.template(variables)).fadeTo(500, 1);
            this.$location = this.$('.location');

            // Create two variable with the names of the months and days in an array
            var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]; 
            var dayNames= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

            // Create a newDate() object
            var newDate = new Date();
            // Extract the current date from Date object
            newDate.setDate(newDate.getDate());
            $('#Date').html(dayNames[newDate.getDay()] + " " + newDate.getDate() + ' ' + monthNames[newDate.getMonth()] + ' ' + newDate.getFullYear());
                

            return this;
        },
        updateTime: function() {
            this.updateSeconds();
            this.updateMinutes();
            this.updateHours();
        },
        updateSeconds: function () {
            // Create a newDate() object and extract the seconds of the current time on the visitor's
            var seconds = new Date().getSeconds();
            // Add a leading zero to seconds value
            $("#sec").html(( seconds < 10 ? "0" : "" ) + seconds);
        },
        updateMinutes: function () {
            // Create a newDate() object and extract the minutes of the current time on the visitor's
            var minutes = new Date().getMinutes();
            // Add a leading zero to the minutes value
            $("#min").html(( minutes < 10 ? "0" : "" ) + minutes);
        },
        updateHours: function () {
            // Create a newDate() object and extract the hours of the current time on the visitor's
            var hours = new Date().getHours();
            // Add a leading zero to the hours value
            $("#hours").html(( hours < 10 ? "0" : "" ) + hours);
        },
        editLocation: function () {
            if (!this.$el.hasClass('editing')) {
              this.$location.attr('contenteditable', true).addClass('editing pulse').focus();
              setEndOfContenteditable(this.$location.get(0));
            }
        },
        onAnimationEnd: function (e) {
            if (e.originalEvent.animationName === "pulse") {
            this.$location.removeClass('pulse');
          }
        },
        onKeypress: function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
                this.saveLocation();
            }
        },
        onKeydown: function (e) {
            if (e.keyCode === 27) {
                this.$location.html(this.model.get('location')); //revert
                this.doneEditingLocation();
            }
        },
        saveLocation: function () {
            this.model.save('manualLocation', this.$location.html());
            this.doneEditingLocation();
            ga('send', 'event', 'Weather', 'Set Manual Location');
        },
        doneEditingLocation: function () {
            this.$location.attr('contenteditable', false).removeClass('editing').addClass('pulse');
        },
        updateWeather: function() {
            // Yahoo API ID
            // var APPID = 'qSgI6d54';
            var that = this;
            getCoordinates();

            function getCoordinates() {
                navigator.geolocation.getCurrentPosition(coordinatesSuccess, coordinatesError);
            }
            function coordinatesSuccess(position) {
                getLocation(position.coords.latitude + ',' + position.coords.longitude);
            }
            function coordinatesError(error) {
                console.log('Error getting location: ' + error.code + ', msg: ' + error.message);

                if(that.model.get('manualLocation')) {
                    getLocation('');
                }
            }

            function getLocation(apiLocation) {
                if (that.model.get('manualLocation')) {
                    apiLocation = that.model.get('manualLocation');
                }
                var apiQuery = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20geo.placefinder%20where%20text%3D%22' + encodeURIComponent(apiLocation) + '%22%20and%20gflags%3D%22R%22&format=json&diagnostics=true&callback=';

                $.getJSON(apiQuery, function(r){
                    var count = r.query.count;
                    if (count > 1) {
                        var results = r.query.results.Result[0];
                    } else if (count == 1) {
                        var results = r.query.results.Result;
                    } else {
                        that.$location.append('<br>not found');
                        var results = '';
                    }

                    // HACK: Store country code globally here to
                    // use to determine whether or not to show promo
                    // images.
                    localStorage.country = results.countrycode;

                    var location = results.city;
                    //if (results.statecode) { location = location + ' ' + results.statecode; }
                    var woeid = results.woeid;

                    that.model.save('location', location);
                    that.model.save('woeid', woeid);
                    getWeather(woeid);
                }).error( function(error) {
                    console.log("Error getting WoeID");
                });
            }

            function getWeather(woeid) {
                // to test
                // http://developer.yahoo.com/yql/console/#h=select+*+from+weather.forecast+where+woeid%3D12698337+and+u%3D'c'
                var weatherYQL = 'https://query.yahooapis.com/v1/public/yql?q=' + encodeURIComponent('select * from weather.forecast where woeid=' + woeid + ' and u="'+ that.model.get('unit') + '"') + '&format=json&callback=?';
                //console.log(weatherYQL);
                $.getJSON(weatherYQL, function(r) {
                    if(r.query.count == 1){
                        var weather_item = r.query.results.channel.item;

                        var temperature = weather_item.condition.temp;
                        var conditon_text = weather_item.condition.text;
                        var updated_date = weather_item.condition.date;
                        var temperature_unit = r.query.results.channel.units.temperature;

                        that.model.save('temperature', temperature);
                        that.model.save('condition', conditon_text);
                        that.model.save('updated', updated_date);
                        that.model.save('unit', temperature_unit);

                        var forecast_1 = weather_item.forecast[1];
                        var forecast_2 = weather_item.forecast[2];
                        var forecast_3 = weather_item.forecast[3];

                        that.model.save('forecast_1', forecast_1);
                        that.model.save('forecast_2', forecast_2);
                        that.model.save('forecast_3', forecast_3);
                    }
                    else {
                        console.log("Error getting weather data: Result count not equal to one");
                    }
                }).error( function(error) {
                    console.log("Error getting weather data: " + error);
                });
            }
        }
	});
})(jQuery);
