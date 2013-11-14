from django.contrib import admin

from . import models


class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ('name', )
admin.site.register(models.MuscleGroup, MuscleGroupAdmin)


class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name', 'muscle_group')
admin.site.register(models.Exercise, ExerciseAdmin)
