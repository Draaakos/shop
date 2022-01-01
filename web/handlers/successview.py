from django.shortcuts import redirect
from django.views.generic import TemplateView
from web.dto import successdetail
from api.services import Payment


class SuccessView(TemplateView):
    template_name = 'success.html'
