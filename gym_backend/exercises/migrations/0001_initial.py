# -*- coding: utf-8 -*-
from south.utils import datetime_utils as datetime
from south.db import db
from south.v2 import SchemaMigration
from django.db import models


class Migration(SchemaMigration):

    def forwards(self, orm):
        # Adding model 'MuscleGroup'
        db.create_table(u'exercises_musclegroup', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255)),
        ))
        db.send_create_signal(u'exercises', ['MuscleGroup'])

        # Adding model 'Exercise'
        db.create_table(u'exercises_exercise', (
            (u'id', self.gf('django.db.models.fields.AutoField')(primary_key=True)),
            ('muscle_group', self.gf('django.db.models.fields.related.ForeignKey')(related_name='exercise_set', to=orm['exercises.MuscleGroup'])),
            ('name', self.gf('django.db.models.fields.CharField')(max_length=255)),
            ('description', self.gf('django.db.models.fields.TextField')()),
            ('youtube_link', self.gf('django.db.models.fields.URLField')(max_length=200)),
        ))
        db.send_create_signal(u'exercises', ['Exercise'])


    def backwards(self, orm):
        # Deleting model 'MuscleGroup'
        db.delete_table(u'exercises_musclegroup')

        # Deleting model 'Exercise'
        db.delete_table(u'exercises_exercise')


    models = {
        u'exercises.exercise': {
            'Meta': {'object_name': 'Exercise'},
            'description': ('django.db.models.fields.TextField', [], {}),
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'muscle_group': ('django.db.models.fields.related.ForeignKey', [], {'related_name': "'exercise_set'", 'to': u"orm['exercises.MuscleGroup']"}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'}),
            'youtube_link': ('django.db.models.fields.URLField', [], {'max_length': '200'})
        },
        u'exercises.musclegroup': {
            'Meta': {'ordering': "['id']", 'object_name': 'MuscleGroup'},
            u'id': ('django.db.models.fields.AutoField', [], {'primary_key': 'True'}),
            'name': ('django.db.models.fields.CharField', [], {'max_length': '255'})
        }
    }

    complete_apps = ['exercises']