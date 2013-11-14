# -*- coding: utf-8 -*-
from rest_framework import serializers

from . import models


class MuscleGroupSerializer(serializers.ModelSerializer):
    exercise_set = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = models.MuscleGroup
        fields = ('id', 'name', 'exercise_set')


class ExerciseSerializer(serializers.ModelSerializer):
    muscle_group = serializers.Field('muscle_group.name')

    class Meta:
        model = models.Exercise
        fields = ('id', 'name', 'description', 'muscle_group', 'youtube_link')