/**
 * Created by djex on 01.09.16.
 */

var app = app || {};

$(function(){

    'use strict';

    app.DetailsPlaceView = Backbone.View.extend({

        el: "#placeDetails",
        template: _.template($("#detailsPlaceTemplate").html()),

        render: function () {

            var detailPlaceTemplate;

            detailPlaceTemplate = this.template(this.model.toJSON());
            this.$el.html(detailPlaceTemplate);
            return this;
        }

    });

});



