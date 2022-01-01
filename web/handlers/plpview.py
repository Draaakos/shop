from django.views.generic import TemplateView
from web.models import Product
from web.dto import productlist


class PLPView(TemplateView):
    template_name = 'plp.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        dto = productlist.DTO(Product.objects.all())
        context['serializedContent'] = dto.to_json()
        return context
