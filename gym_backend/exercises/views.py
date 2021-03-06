# -*- coding: utf-8 -*-
from rest_framework import viewsets
from rest_framework.decorators import link
from rest_framework.response import Response
from rest_framework.renderers import StaticHTMLRenderer

from . import models
from . import serializers


class MuscleGroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.MuscleGroup.objects.all()
    serializer_class = serializers.MuscleGroupSerializer


class ExercisesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Exercise.objects.all()
    serializer_class = serializers.ExerciseSerializer

    def get_queryset(self):
        queryset = super(ExercisesViewSet, self).get_queryset()
        muscle_group_pk = self.request.GET.get('muscle_group', None)
        if muscle_group_pk:
            queryset = queryset.filter(muscle_group__id=muscle_group_pk)
        return queryset

    @link(renderer_classes=[StaticHTMLRenderer])
    def markup(self, request, *args, **kwargs):
        exercise = self.get_object()
        return Response(exercise.markup_description)
