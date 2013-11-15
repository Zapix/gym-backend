from django.db import models
from django.contrib import admin

from . import models as exercise_models
from . import widgets as exercise_widgets


class MuscleGroupAdmin(admin.ModelAdmin):
    list_display = ('name', )
admin.site.register(exercise_models.MuscleGroup, MuscleGroupAdmin)


class ExerciseAdmin(admin.ModelAdmin):
    list_display = ('name', 'muscle_group')
    formfield_overrides = {
        models.TextField: {'widget': exercise_widgets.ReStructuredTextarea}
    }

admin.site.register(exercise_models.Exercise, ExerciseAdmin)
