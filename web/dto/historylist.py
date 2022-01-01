import json
from web.models import Purchase
from web.models import PurchaseDetail
from web.models import Product


class DTO:
    def __init__(self, customer):
        self.customer = customer


    def to_json(self):
        output = {
            'purchaseList': self._get_items(self.customer.id),
            'person': self._customer_format()
        }

        return json.dumps(output)

    def _customer_format(self):
        return {
            'id': self.customer.id,
            'firstName': self.customer.first_name,
            'lastName': self.customer.last_name,
            'email': self.customer.email,
            'phone': self.customer.phone
        }


    def _get_items(self, customer_id):
        purchase_list = []
        purchases = Purchase.objects.filter(customer_id=customer_id)
        for purchase in purchases:
            purchase_id = purchase.id
            purchase_detail_list = PurchaseDetail.objects.filter(purchase_id=purchase_id)

            for purchase_detail in purchase_detail_list:
                product = Product.objects.get(pk=purchase_detail.product_id)

                purchase_list.append({
                    'purchaseId': purchase_id,
                    'status': purchase.status,
                    'name': product.name,
                    'price': product.price + (product.price * 0.19),
                    'sku': product.sku,
                    'productId': product.id,
                    'images': self._get_images(product),
                })

        return purchase_list


    def _get_images(self, product):
        xs = []
        images = product.productimage_set.all()

        for image in images:
            pi = _ProductImage(image)
            xs.append(pi.to_json())

        return xs



class _ProductImage:
    def __init__(self, image):
        self.image = image

    def to_json(self):
        return {
            'url': self.image.image.url
        }
