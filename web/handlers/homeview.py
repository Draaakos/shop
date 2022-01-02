import json
from django.views.generic import TemplateView
from web.models import Product
from web.dto import productlist
from web.models import Slider


class HomeView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        dto = productlist.DTO(Product.objects.all())
        context['serializedContent'] = {
            'productList': json.loads(dto.to_json()),
            'slider': [ item.to_json() for item in Slider.objects.all() ]
        }
        return context
