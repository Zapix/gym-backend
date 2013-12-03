# -*- coding: utf-8 -*-
import json
import functools

from django import http
from django.contrib.auth import forms as auth_forms
from django.contrib.auth import login
from django.contrib.auth import logout
from django.views.decorators.csrf import csrf_exempt


def post_allowed(func):
    """
    Allows only post request
    """
    @functools.wraps(func)
    def wrapper(request, *args, **kwargs):
        if request.method == 'POST':
            return func(request, *args, **kwargs)
        return http.HttpResponse(
            status=400,
            content='Only post method allowed'
        )
    return wrapper


@csrf_exempt
@post_allowed
def api_registration(request):
    """
    Register user via post json request
    """
    data = json.loads(request.body)
    form = auth_forms.UserCreationForm(data=data)
    if form.is_valid():
        user = form.save(commit=False)
        user.is_active = True
        user.save()
        return http.HttpResponse(
            status=201,
            content=json.dumps({'pk': user.pk}),
            content_type='application/json'
        )
    return http.HttpResponse(
        status=400,
        content=json.dumps(form.errors),
        content_type='application/json'
    )


@csrf_exempt
@post_allowed
def api_login(request):
    """
    Login user via post json request
    """
    data = json.loads(request.body)
    form = auth_forms.AuthenticationForm(data=data)
    if form.is_valid():
        login(request, form.user_cache)
        return http.HttpResponse(
            status=200,
            content={'pk': form.user_cache.pk},
            content_type='application/json'
        )
    return http.HttpResponse(
        status=400
    )


def api_logout(request):
    """
    Logout user via request
    """
    logout(request)
    return http.HttpResponse(
        status=200,
        content='logout'
    )
