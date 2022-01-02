import json
from web.models import Product, ProductPlatform
from web.models import Stock


class DTO:
    def __init__(self, product):
        self.product = product

    def to_json(self):
        iva = 0
        related_skus = self._get_related_skus()
        images = _ImagesDTO(self.product).to_json()
        product_price = int(self.product.price + (self.product.price * iva))

        output = {
            'id': self.product.id,
            'sku': self.product.sku,
            'platform': self._get_platforms(),
            'category': self.product.category.name,
            'price': product_price,
            'name': self.product.name,
            'description': self.product.description,
            'quantity': self._get_stock(),
            'variations': self._get_unique_variations(related_skus),
            'relatedSkus': related_skus,
            'images': images,
            'requeriment': self.product.requeriment.to_json()
        }

        return json.dumps(output)


    def _get_stock(self):
        return len(Stock.objects.filter(product=self.product))


    def _get_platforms(self):
        platform_list = []
        for product_platform in ProductPlatform.objects.filter(product=self.product):
            platform_list.append({
                "name": product_platform.platform.name
            })
        return platform_list


    def _get_related_skus(self):
        elements = []

        if self.product.related_skus is None:
            related_skus = []
        else:
            related_skus = self.product.related_skus.split(',')

        for sku in related_skus:
            related_product = Product.objects.get(sku=sku)
            info = self._get_variation_info(related_product)
            elements.append(info)

        this_product = self._get_variation_info(self.product)
        elements.append(this_product)

        return elements

    def _get_variation_info(self, product):
        info = {
            'sku': product.sku,
            'quantity': product.quantity,
            'variations': {}
        }

        if product.color is not None:
            info['variations']['color'] = {
                'name': product.color.name,
                'hexcolor': product.color.hexcolor
            }

        if product.size is not None:
            info['variations']['size'] = { 'name': product.size.name }

        return info

    def _get_unique_variations(self, products):
        colors = {}
        sizes = {}

        for product in products:
            variation = product['variations']

            if 'size' in variation:
                sizes[variation['size']['name']] = {
                    'name': variation['size']['name']
                }

            if 'color' in variation:
                colors[variation['color']['name']] = {
                    'name': variation['color']['name'],
                    'hexcolor': variation['color']['hexcolor']
                }

        variations = {
            'colors': [colors[key] for key in colors.keys()],
            'sizes': [sizes[key] for key in sizes.keys()]
        }

        return variations


class _ImagesDTO:
    def __init__(self, product):
        self.product = product

    def to_json(self):
        xs = []

        for pi in self.product.productimage_set.all():
            xs.append({ 'url': pi.image.url })

        return xs
