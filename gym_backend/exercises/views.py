# -*- coding: utf-8 -*-
from rest_framework import viewsets

from . import models
from . import serializers


class MuscleGroupViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.MuscleGroup.objects.all()
    serializer_class = serializers.MuscleGroupSerializer


class ExercisesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = models.Exercise.objects.all()
    serializer_class = serializers.ExerciseSerializer
