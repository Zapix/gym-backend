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
        muscleGroupPk: null,
        muscleGroupName: null,
        initialize: function(models, options){
            var properties = options|| {};
            this.muscleGroupPk = properties.muscleGroupPk || null;
            this.muscleGroupName = properties.muscleGroupName || 'Все';
        },
        url: function(){
            var link = 'http://192.168.0.33:8000/api/v1/exercises/' ;
            link += (this.muscleGroupPk)?'?muscle_group='+this.muscleGroupPk: '';
            console.log(link);
            return link
        }
    });


    var applicationCollections = {}
    applicationCollections.MuscleGroupList = MuscleGroupList;
    applicationCollections.ExerciseList = ExerciseList;
    return applicationCollections;
});
