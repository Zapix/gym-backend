/**
 *
 * Created by zapix on 21.11.13.
 */
define(['jquery', 'backbone'], function($, Backbone){
    var applicationModels = {};

    applicationModels.MuscleGroup = Backbone.Model.extend({
        idAttribute: 'pk'
    });


    applicationModels.Exercise = Backbone.Model.extend({
        idAttribute: 'pk'
    });
    return applicationModels;
});
