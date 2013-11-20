var appInit = function(){
    $.ajaxSetup({
        crossDomain: true
    });
    window.MuscleGroup = Backbone.Model.extend({
        idAttribute: 'pk'
    });


    window.MuscleGroupList = Backbone.Collection.extend({
        model: MuscleGroup,
        url: 'http://192.168.0.33:8000/api/v1/muscles/'
    });
    window.muscleGroups = new window.MuscleGroupList;


    window.Exercise = Backbone.Model.extend({
        idAttribute: 'pk',
        show: function(){
            this.trigger('show');
        }
    });


    window.ExerciseList = Backbone.Collection.extend({
        model: Exercise,
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
            console.log(value);
            this.selectedGroup = value;
            console.log(value);
            this.trigger('selectchanged', value);
        },
        deselectGroup: function(){
            this.selectedGroup = null;
            this.trigger('selectchanged', null);
        }
    });
    window.exercises = new ExerciseList;


    window.MuscleGroupView = Backbone.View.extend({
        el: '#muscle-group-select',
        events: {
            'change': 'selectMuscleGroup'
        },
        initialize: function(){
            muscleGroups.bind('all', this.render);
            muscleGroups.fetch();
        },
        render: function(){
            $('#muscle-group-select').html(_.template(
                $('#muscle-group-select-tmpl').html(),
                {'muscleGroups': muscleGroups.toArray()}
            )).selectmenu('refresh');
        },
        selectMuscleGroup: function(event){
            var selectedGroup = this.$el.val();
            if(selectedGroup){
                exercises.selectGroup(selectedGroup);
            }else{
                exercises.deselectGroup();
            }
        }
    });
    window.muscleGroupView = new MuscleGroupView;


    window.ExerciseView = Backbone.View.extend({
        initialize:function(){
            this.model.bind('show', this.render, this)
        },
        render: function(){
            var exercise = this.model;
            $.get(exercise.get('markup_link'), function(respData){
                $('#exercise-info').html(_.template(
                    $("#exercise-info-tmpl").html(),
                    {
                        'exercise': exercise,
                        'exerciseMarkup': respData
                    }
                ));

            });
        }
    });


    window.ExerciseListView = Backbone.View.extend({
        el: '#exercise-list',
        initialize: function(){
            exercises.bind('all', this.render, this);
            exercises.bind('add', this.initExerciseViewOne, this);
            exercises.bind('selectchanged', this.render, this);
            exercises.fetch();
        },
        render: function(){
            $('#exercise-list').html(_.template(
                $('#exercise-list-tmpl').html(),
                {'exercises': exercises.getSelected()}
            ));
            $('#exercise-list').listview('refresh')
        },
        initExerciseViewOne: function(exercise){
            console.log(exercise);
            var exerciseView = new ExerciseView({model: exercise});
        }
    });
    window.exerciseListView = new ExerciseListView;

    window.ExerciseRouter = Backbone.Router.extend({
        routes: {
            'exercises': 'showExercises',
            'exercises/detail/:pk': 'showExerciseDetail'
        },
        showExercises: function(){
            console.log('show list');
            $.mobile.changePage('#exercise-list-page');
        },
        showExerciseDetail: function(pk){
            console.log('show detail');
            exercise = exercises.get(pk);
            if(exercise){
                exercise.show();
                $.mobile.changePage('#exercise-detail-page');
            }
        }
    });
    window.exerciseRouter = new ExerciseRouter();
    Backbone.history.start();
};