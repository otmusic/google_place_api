/**
 * Created by djex on 17.08.16.
 */

var app = app || {};

$(function () {

    'use strict';

    app.CurrentUserLocation = Backbone.Model.extend({

        defaults: {
            latitude: 0,
            longitude: 0
        },

        initialize: function () {

            var googleMap, self;

            googleMap = new app.GoogleMap();
            self = this;

            self.getUserLocation();

            self.on('change', function() {
                googleMap.buildGoogleMap(self.toJSON())
            })

        },

        getUserLocation: function () {

            var self;
            self = this;

            if (navigator.geolocation) {

                navigator.geolocation.getCurrentPosition(function(position) {

                    self.setLatLng(position);

                });

            } else {

                alert('Geolocation is not supported for this Browser/OS version yet.');

            }

        },

        setLatLng: function(position) {

            this.set({ latitude: position.coords.latitude,  longitude: position.coords.longitude});

        }

    });

});
