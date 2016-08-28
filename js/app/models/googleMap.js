/**
 * Created by djex on 18.08.16.
 */
var app = app || {};

$(function () {

    'use strict';

    app.GoogleMap = Backbone.Model.extend({

        initialize: function () {
            var self = this
        },

        buildGoogleMap: function (userCoordinateObject) {
            var map, self;
            self = this;

            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: userCoordinateObject.latitude, lng: userCoordinateObject.longitude },
                zoom: 15
            });

            self.getPlacesFromGoogleMapAPI(userCoordinateObject, map)

        },

        getPlacesFromGoogleMapAPI: function(userCoordinateObject, map) {

            var service, self;
            self = this;

            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            service = new google.maps.places.PlacesService(map);

            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            service.nearbySearch({
                location: { lat: userCoordinateObject.latitude, lng: userCoordinateObject.longitude },
                radius: 500,
                types: ['store']
            }, function (results, status) {

                var places = [],
                    placesCollection;

                if (status === 'OK') {
                    $.each(results, function(index, value) {
                        //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                        var place = new app.Place({
                            name: value.name,
                            latitude: value.geometry.location.lat(),
                            longitude: value.geometry.location.lng(),
                            icon: value.icon,
                            place_id: value.place_id,
                            vicinity: value.vicinity,
                            photos: value.photos,
                            rating: value.rating,
                            opening: value.opening_hours,
                            geometry: value.geometry,
                            types: value.types
                        });

                        self.createMarker(value, map, place);

                        places.push(place);

                    });

                    placesCollection = new app.PlaceCollections(places);

                    new app.AllPlacesView({ collection: placesCollection })


                } else {
                    alert('Sorry but something with wrong');
                }
            });

        },

        createMarker: function (place, map, modelPlace) {
            var marker;
            //noinspection JSUnresolvedVariable,JSUnresolvedFunction

            marker = new google.maps.Marker({
                map: map,
                draggable: true,
                animation: google.maps.Animation.DROP,
                position: place.geometry.location
            });

            modelPlace.set("mapMarker", marker);
        }

    });

});
