/**
 * Created by zapix on 21.11.13.
 */
define(['backbone', 'myjs/views', 'myjs/collections', 'myjs/models'], function(Backbone, applicationViews, applicationCollections, applicationModels){
    console.log('Build router');
    var ApplicationRouter = Backbone.Router.extend({
        'routes': {
            "": 'main',
            "muscle/groups": 'muscleGroupList',
            "muscle/groups/exercises": 'exerciseList',
            "muscle/groups/:muscleGroupPk/exercises": 'exerciseList',
            "exercises/:id": 'exerciseDetail'
        },
        initialize:function () {
            $('body').on('click', '.back',function(event) {
                window.history.back();
                return false;
            });
            this.firstPage = true;
        },

        main: function(){
            console.log('main page');
            this.changePage(new applicationViews.MainView());
        },

        muscleGroupList: function(){
            var router = this;
            console.log('Muscle group list');
            $.mobile.loading('show', {
                theme: 'a',
                text: 'Загружаю...',
                textVisible: true
            });
            var muscleGroupList = new applicationCollections.MuscleGroupList;

            muscleGroupList.on('sync', function(){
                $.mobile.loading('hide');
                router.changePage(new applicationViews.MuscleGroupListView({
                    collection: muscleGroupList
                }));
            });
            muscleGroupList.fetch();
        },

        exerciseList: function(muscleGroupPk){
            var router = this
            console.log('Exercise list ' + (muscleGroupPk || ''));
            $.mobile.loading('show', {
                theme: 'a',
                text: 'Загружаю...',
                textVisible: true
            });

            var showExerciseList = function(groupName){
                exerciseList = new applicationCollections.ExerciseList([], {
                    'muscleGroupPk': muscleGroupPk,
                    'muscleGroupName': groupName
                });
                exerciseList.on('sync', function(){
                    console.log('All loaded successful');
                    $.mobile.loading('hide');
                    router.changePage(new applicationViews.ExerciseListView({
                        collection: exerciseList
                    }))
                }, router);
                exerciseList.fetch();
            }
            if(muscleGroupPk){
                muscleGroup = new applicationModels.MuscleGroup({pk: muscleGroupPk});
                muscleGroup.on('sync', function(){
                    showExerciseList(muscleGroup.get('name'));
                }, this);
                muscleGroup.fetch();
            }else{
                showExerciseList();
            }
        },

        exerciseDetail: function(id){
            var router = this;
            console.log('Detail exercise ' + id);
            $.mobile.loading('show', {
                theme: 'a',
                text: 'Загружаю...',
                textVisible: true
            });
            exercise = new applicationModels.Exercise({pk:id});
            exercise.on('sync', function(){
                $.get(exercise.get('markup_link'), function(respData){
                    $.mobile.loading('hide');
                    console.log(respData);
                    router.changePage(
                        new applicationViews.ExerciseDetailView({
                            model: exercise,
                            markupData: respData
                        })
                    )
                });
            }, this);
            exercise.fetch();
        },

        changePage: function(page){
            $(page.el).attr('data-role', 'page');
            page.render();
            $('body').append($(page.el));
            $.mobile.changePage(
                $(page.el),
                {
                    changeHash: false
                }
            )
        }
    });
    return ApplicationRouter;
});