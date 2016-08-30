/**
 * Created by djex on 29.08.16.
 */

var app = app || {};

$(function(){

    'use strict';

    app.FindPlaceView = Backbone.View.extend({

        el: '#findPlaceWithGoogleApi',

        events: {
            "submit form": 'findPlace'
        },

        initialize: function () {

            var findInput;


            findInput = document.getElementById('findPlaceInput');
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            new google.maps.places.Autocomplete(findInput);
        },

        findPlace: function (e) {

            e.preventDefault();

            var googleMap, currentLocation, searchInputValue;

            searchInputValue = this.$('input[type=text]').val();
            currentLocation = store.get('userCurrentLocation');

            googleMap = new app.GoogleMap();
            googleMap.buildGoogleMap(currentLocation, searchInputValue);


        }

    });

});



