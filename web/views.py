import json
from django.shortcuts import render
from django.views.generic import TemplateView
from web.handlers.plpview import PLPView
from web.handlers.pdpview import PDPView
from web.handlers.successview import SuccessView
from web.handlers.profileview import ProfileView

home = TemplateView.as_view(template_name='home.html')
product_list = PLPView.as_view()
product_detail = PDPView.as_view()
basket = TemplateView.as_view(template_name='basket.html')
login = TemplateView.as_view(template_name='login.html')
register = TemplateView.as_view(template_name='register.html')
checkout = TemplateView.as_view(template_name='checkout.html')
profile = ProfileView.as_view()
success = SuccessView.as_view()
