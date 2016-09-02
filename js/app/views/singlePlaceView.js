/**
 * Created by djex on 22.08.16.
 */

var app = app || {};

$(function(){

    'use strict';

    app.SinglePlaceView = Backbone.View.extend({

        tagName: "li",
        className: "placeListItem",
        template: _.template($("#placeElement").html()),
        events: {
          "click .show-more-info": 'showMorePlaceInfo'
        },

        render: function () {

            var placeTemplate;

            placeTemplate = this.template(this.model.toJSON());
            this.$el.html(placeTemplate);
            return this;

        },

        showMorePlaceInfo: function() {
            var self, placeModel;
            self = this;
            placeModel = self.model.toJSON();


            // noinspection JSUnresolvedVariable,JSUnresolvedFunction
            placeModel.mapService.getDetails({
                placeId: placeModel.placeId
            }, function(response, status) {
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                if (status === google.maps.places.PlacesServiceStatus.OK) {

                    //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                    self.model.set({
                        website: response.website,
                        phone: response.formatted_phone_number,
                        reviews: response.reviews,
                        workSchedule: (typeof(response.opening_hours) == 'undefined') ? [] : response.opening_hours.weekday_text
                    });

                    var detailsPlace = new app.DetailsPlaceView({ model: self.model });
                    $.fancybox(detailsPlace.render().el, {
                        'width':400,
                        'hideOnOverlayClick' : true,
                        'autoDimensions' : true,
                        beforeShow: function () {
                            self.toggleAnimationMarker();
                        },
                        afterClose: function () {
                            self.toggleAnimationMarker();
                        }
                    });


                }

            });


        },

        toggleAnimationMarker: function() {

            var place;
            place = this.model.toJSON();

            //noinspection JSUnresolvedVariable,JSUnresolvedFunction
            if (place.mapMarker.getAnimation() !== null) {
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                place.mapMarker.setAnimation(null);
            } else {
                //noinspection JSUnresolvedVariable,JSUnresolvedFunction
                place.mapMarker.setAnimation(google.maps.Animation.BOUNCE);
            }

        }

    });

});



