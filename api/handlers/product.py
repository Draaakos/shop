import json
from web.dto import productdetail
from web.models import Product
from django.views.generic import View
from django.http import JsonResponse

class ProductView(View):
    def get(self, request, **kwargs):
        sku = kwargs.get('sku')
        product = Product.objects.get(sku=sku)
        product_detail = productdetail.DTO(product)

        return JsonResponse({
            'product': json.loads(product_detail.to_json())
        })
