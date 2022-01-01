#!/bin/bash
python manage.py migrate && \
python manage.py collectstatic --noinput && \
gunicorn -c .bin/gunicorn.config.py shop.wsgi:application
