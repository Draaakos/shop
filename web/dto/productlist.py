import json
from django.urls import reverse


class DTO:
    def __init__(self, products):
        self.products = products

    def to_json(self):
        output = {
            'products': []
        }

        for product in self.products:
            row = _ProductDTO(product)
            output['products'].append(row.to_json())

        return json.dumps(output)


class _ProductDTO:
    def __init__(self, product):
        self.product = product

    def to_json(self):
        url = reverse(
            'web:pdp',
            args=[self.product.category.name, self.product.sku, self.product.name.replace(' ', '-')]
        )

        price = self.product.price
        iva = 0
        adjusted_price = price + (price * iva)

        return {
            'id': self.product.id,
            'name': self.product.name,
            'price': adjusted_price,
            'before_price': self.product.before_price,
            'quantity': self.product.quantity,
            'description': self.product.description,
            'url': url,
            'sku': self.product.sku,
            'images': self._get_images(),
        }

    def _get_images(self):
        xs = []
        images = self.product.productimage_set.all()

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
