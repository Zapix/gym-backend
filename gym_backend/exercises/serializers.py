# -*- coding: utf-8 -*-
from rest_framework import serializers
from rest_framework.renderers import JSONRenderer

from . import models


class ExerciseRelatedSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.Field('pk')

    class Meta:
        model = models.Exercise
        fields = ('pk', 'url', 'name')


class ExerciseRelatedField(serializers.RelatedField):
    read_only = True
    serializers_class = ExerciseRelatedSerializer

    def to_native(self, value):
        """
        Generates json data for exercises.
        Exercises item include: pk, name, url
        :param value: exercise value
        :type value: :class:`exercises.models.Exercise`
        :return: json object
        :rtype: str
        """
        serializer = self.serializers_class(value)
        return JSONRenderer().render(serializer.data)


class MuscleGroupSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.Field('pk')
    exercise_set = ExerciseRelatedField(many=True)

    class Meta:
        model = models.MuscleGroup
        fields = ('url', 'name', 'exercise_set')


class ExerciseSerializer(serializers.HyperlinkedModelSerializer):
    pk = serializers.Field('pk')
    muscle_group_pk = serializers.Field('muscle_group.pk')
    muscle_group = serializers.Field('muscle_group.name')
    markup_link = serializers.HyperlinkedIdentityField(
        view_name='exercise-markup'
    )
    markup_description = serializers.Field('markup_description')

    class Meta:
        model = models.Exercise
        fields = (
            'pk', 'url', 'name', 'description',
            'muscle_group', 'muscle_group_pk',
            'markup_link', 'youtube_link'
        )
