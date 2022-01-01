from django.views.generic import TemplateView
from web.models import Product
from web.dto import productdetail


class PDPView(TemplateView):
    template_name = 'pdp.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        sku = kwargs['sku']
        product = Product.objects.get(sku=sku)
        dto = productdetail.DTO(product)
        context['serializedContent'] = dto.to_json()

        return context
