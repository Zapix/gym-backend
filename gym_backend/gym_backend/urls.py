from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from rest_framework.routers import DefaultRouter

from exercises import views as exercises_views


router = DefaultRouter()
router.register('muscles', exercises_views.MuscleGroupViewSet)
router.register('exercises', exercises_views.ExercisesViewSet)

urlpatterns = patterns(
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/',  include(router.urls)),
    url(r'^api/v1/users', include('userprofiles.urls'))
)
