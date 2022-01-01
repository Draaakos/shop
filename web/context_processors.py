import os
from django.conf import settings

def env_vars(request):
    return {
        'is_production': not settings.DEBUG,
        'is_logged': request.session.get('is_logged'),
        'session_information': request.session.get('session_information')
    }
