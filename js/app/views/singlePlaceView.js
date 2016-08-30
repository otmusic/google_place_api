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
            var self;
            self = this;

            self.$el.find('.more-info').toggle(function () {
                self.toggleAnimationMarker();
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

        },

        findPlace: function () {
            console.log('click button');
        }

    });

});



