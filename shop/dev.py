import os

DEBUG = True

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
        'TEST': {
            'NAME': ':memory:'
        }
    }
}

EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'noreply@opencasa.com'
EMAIL_HOST_PASSWORD = 'iepwwqxsaqwhlcvr'
