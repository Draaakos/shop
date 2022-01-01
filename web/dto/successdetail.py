import json
from web.models import Product
from web.models import Purchase
from web.models import PurchaseDetail


class DTO:
    def __init__(self, purchase_id):
        self.purchase_id = purchase_id
        self.products = []


    def to_json(self):
        output = {
            'products': []
        }

        for product in self.products:
            row = _ProductDTO(product)
            output['products'].append(row.to_json())

        return json.dumps(output)


    def get_product_list(self):
        purchase_detail_list = PurchaseDetail.objects.filter(purchase_id=self.purchase_id)
        for purchase_detail in purchase_detail_list:
            product = Product.objects.get(pk=purchase_detail.product_id)
            self.products.append(product)


class _ProductDTO:
    def __init__(self, product):
        self.product = product


    def to_json(self):
        return {
            'name': self.product.name,
            'sku': self.product.sku,
            'price': self.product.price,
            'description': self.product.description
        }
