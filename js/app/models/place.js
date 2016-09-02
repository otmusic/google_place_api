var app = app || {};

$(function () {

    'use strict';


    app.Place = Backbone.Model.extend({

        defaults: {
            rating: '0.0'
        }


    });

    return app.Place;

});
