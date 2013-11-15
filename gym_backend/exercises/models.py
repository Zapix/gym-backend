from django.db import models
from django.utils.translation import ugettext_lazy as _

import creole


class MuscleGroup(models.Model):
    """
    Name of muscles group for training
    """
    name = models.CharField(
        max_length=255,
        verbose_name=_('Muscle`s name')
    )

    class Meta:
        verbose_name = _('Muscle group')
        verbose_name_plural = _('Muscle groups')
        ordering = ['id']

    def __unicode__(self):
        if self.pk:
            return self.name
        else:
            return u'New Muscle Group'


class Exercise(models.Model):
    """
    Information about exercise for muscle group.
    Storing description and link to youtube video
    """
    muscle_group = models.ForeignKey(
        'MuscleGroup',
        related_name='exercise_set',
        verbose_name=_('Muscle group')
    )
    name = models.CharField(
        max_length=255,
        verbose_name=_('Name')
    )
    description = models.TextField(
        verbose_name=_('Description')
    )
    youtube_link = models.URLField(
        verbose_name=_('Youtube link')
    )

    @property
    def markup_description(self):
        return creole.creole2html(self.description)
