/**
 *
 * Created by zapix on 21.11.13.
 */
define(['jquery', 'backbone', 'myjs/models'], function($, Backbone, applicationModels){
    var MuscleGroupList = Backbone.Collection.extend({
        model: applicationModels.MuscleGroup,
        url: 'http://192.168.0.33:8000/api/v1/muscles/'
    });


    var ExerciseList = Backbone.Collection.extend({
        model: applicationModels.Exercise,
        url: 'http://192.168.0.33:8000/api/v1/exercises/',
        selectedGroup: null,
        getSelected: function(){
            if(this.selectedGroup){
                var selectedGroup = this.selectedGroup;
                return this.filter(function(item){
                    return item.get('muscle_group_pk') == selectedGroup
                });
            }
            return this.toArray();
        },
        selectGroup: function(value){
            this.selectedGroup = value;
            this.trigger('selectchanged', value);
        },
        deselectGroup: function(){
            this.selectedGroup = null;
            this.trigger('selectchanged', null);
        }
    });


    var applicationCollections = {}
    applicationCollections.MuscleGroupList = MuscleGroupList;
    applicationCollections.ExerciseList = ExerciseList;
    return applicationCollections;
});
