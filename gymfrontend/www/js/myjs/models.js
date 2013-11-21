/**
 *
 * Created by zapix on 21.11.13.
 */
define(['jquery', 'backbone'], function($, Backbone){
    var applicationModels = {};

    applicationModels.MuscleGroup = Backbone.Model.extend({
        idAttribute: 'pk',
        urlRoot: 'http://192.168.0.33:8000/api/v1/muscles/',
        url: function(){
            return this.urlRoot + this.id + '/';
        }
    });


    applicationModels.Exercise = Backbone.Model.extend({
        idAttribute: 'pk',
        urlRoot: 'http://192.168.0.33:8000/api/v1/exercises/',
        url: function(){
            return this.urlRoot + this.id + '/';
        }
    });
    return applicationModels;
});
