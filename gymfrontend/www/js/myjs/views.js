/**
 *
 * Created by zapix on 21.11.13.
 */
define(['jquery', 'backbone'], function($, Backbone, applicationCollections){
    console.log('Build applicationViews');
    var applicationViews = {};
    applicationViews.MainView = Backbone.View.extend({
        template_el: '#main-tmpl',
        render: function(event) {
            $(this.el).html(_.template(
                $(this.template_el).html()
            ));
            return this
        }
    });

    applicationViews.PageView = Backbone.View.extend({
        template_el: '#page-tmpl',
        render: function(event){
            $.mobile.loading('hide');
            $(this.el).html(_.template(
                $(this.template_el).html(),
                {number: this.attributes.number})
            )
            return this;
        }
    });

    applicationViews.MuscleGroupListView = Backbone.View.extend({
        template_el: '#muscle-group-list-tmpl',
        render: function(){
            $(this.el).html(_.template(
                $(this.template_el).html(),
                {
                    'muscleGroupList': this.collection.toArray()
                }
            ));
            return this;
        }
    });

    applicationViews.ExerciseListView = Backbone.View.extend({
        template_el: '#exercise-list-tmpl',
        render: function(){
            console.log(this.template_el);
            $(this.el).html(_.template(
                $(this.template_el).html(),
                {
                    title: this.collection.muscleGroupName,
                    exerciseList: this.collection.toArray()
                }
            ));
            return this;
        }
    });

    applicationViews.ExerciseDetailView = Backbone.View.extend({
        template_el: '#exercise-detail-tmpl',
        markupData: null,
        initialize: function(options){
            options = options || {};
            this.markupData = options.markupData;
        },
        render: function(){
            $(this.el).html(_.template(
                $(this.template_el).html(),
                {
                    exercise: this.model,
                    markupData: this.markupData
                }
            ));
        }
    });
    return applicationViews;
});
