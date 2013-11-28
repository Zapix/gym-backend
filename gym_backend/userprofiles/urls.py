# -*- coding: utf-8 -*-
from django.conf.urls import url, patterns

from . import views

urlpatterns = patterns(
    '',
    url(r'^signup/$', views.api_registration, name='api_registration'),
    url(r'^login/$', views.api_login, name='api_login'),
    url(r'^logout/$', views.api_logout, name='api_logout'),
)
