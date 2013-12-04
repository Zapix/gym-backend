/**
 *
 * Created by zapix on 21.11.13.
 */
define(['jquery', 'backbone'], function($, Backbone, applicationCollections){
    console.log('Build applicationViews');
    var applicationViews = {};

    var CheckLogIn = Backbone.View.extend({
        initialize: function(){
            console.log('check login');
            var login = window.localStorage.getItem('login')
            if(!login){
                this.render = function(){};
                window.location.hash = '#login'
            }
        }
    });


    applicationViews.TestInheritView = CheckLogIn.extend({
        template_el: '#test-tmpl',
        initialize: function(){
            CheckLogIn.prototype.initialize.apply(this);
            console.log('check inheritance');
        },
        render: function(event){
           $(this.el).html(_.template(
               $(this.template_el).html()
           ));
        }
    });

    applicationViews.LogInView = Backbone.View.extend({
        template_el: '#login-tmpl',
        render: function(event){
            $(this.el).html(_.template(
                $(this.template_el).html()
            ));
            return this
        },
        events: {
            'click #loginForm input[type=button]': 'tryToLogIn'
        },
        tryToLogIn: function(){
            console.log('Checking login');
            var jsonData = JSON.stringify({
                username: $('#login').val(),
                password: $('#password').val()
            });
            $.post(
                'http://192.168.0.33:8000/api/v1/users/login/',
                jsonData,
                function(responseData, textStatus){
                    console.log(textStatus);
                    console.log(responseData);
                },
                'application/json'
            );
        }
    });


    applicationViews.MainView = Backbone.View.extend({
        template_el: '#main-tmpl',
        render: function(event) {
            $(this.el).html(_.template(
                $(this.template_el).html()
            ));
            return this
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
