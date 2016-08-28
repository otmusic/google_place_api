/**
 * Created by djex on 15.08.16.
 */

var app = app || {};

$(function(){

    'use strict';

    app.AllPlacesView = Backbone.View.extend({

        tagName: 'ul',

        initialize: function () {

            $('#places-lists').html(this.render().el);

        },

        render: function() {

            this.collection.each(this.addPlace, this);
            return this;

        },

        addPlace: function (place) {

            var placeView;

            placeView = new app.SinglePlaceView({ model: place });
            this.$el.append(placeView.render().el);
        }

    });

});



