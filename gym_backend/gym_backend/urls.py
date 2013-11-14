from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from rest_framework.routers import DefaultRouter

from exercises import views as exercises_views


router = DefaultRouter()
router.register('muscles', exercises_views.MuscleGroupViewSet)
router.register('exercises', exercises_views.ExercisesViewSet)

urlpatterns = patterns(
    '',
    # Examples:
    # url(r'^$', 'gym_backend.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'api/v1/',  include(router.urls)),
)
