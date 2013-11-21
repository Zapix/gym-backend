/**
 * Created by zapix on 21.11.13.
 */
define(['backbone', 'myjs/views', 'myjs/collections'], function(Backbone, applicationViews, applicationCollections){
    console.log('Build router');
    var ApplicationRouter = Backbone.Router.extend({
        'routes': {
            "": 'main',
            "page/:id": 'page',
            "muscle/groups": 'muscleGroupList'
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
        page: function(id){
            console.log('page ' + id);
            this.changePage(new applicationViews.PageView(
                {
                    'attributes': {
                        number:id
                    }
                }
            ));
        },
        muscleGroupList: function(){
            console.log('Muscle group list');
            this.changePage(new applicationViews.MuscleGroupListView({
                collection:new applicationCollections.MuscleGroupList
            }));
        },
        changePage: function(page){
            $(page.el).attr('data-role', 'page');
            page.render();
            $('body').append($(page.el));

            /*
            var transition = $.mobile.defaultPageTransition;
            //don't slide at first page
            if(this.firstPage){
                transition = 'none';
                this.firstPage = false;
            }
            */
            $.mobile.changePage(
                $(page.el),
                {
                    changeHash: false,
                }
            )
            /* show loading widget if view ask it */
            if(page.isShowLoading){
                $.mobile.loading('show',{
                    theme: 'a',
                    text: 'Загружаю...',
                    textVisible: true
                });
            }
        }
    });
    return ApplicationRouter;
});