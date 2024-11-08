from django.views.generic import TemplateView
from api.models import Product
from web.dto import productdetail


class PDPView(TemplateView):
    template_name = 'pdp.html'

    def get_context_data(self, *args, **kwargs):
        context = super().get_context_data(*args, **kwargs)
        product_id = kwargs['id']
        product = Product.objects.get(pk=product_id)
        dto = productdetail.DTO(product)
        context['serializedContent'] = dto.to_json()

        return context
