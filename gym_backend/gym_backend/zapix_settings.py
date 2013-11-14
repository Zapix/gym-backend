# -*- coding: utf-8 -*-
# flake8: noqa
from .settings import *

DEBUG = True

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'local.db'),
    }
}
