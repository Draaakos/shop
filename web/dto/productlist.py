import json
from api.models import Product


class DTO:
    def __init__(self, products):
        self.products = products

    def to_json(self):
        product_list = []

        for product in self.products:
            product_list.append(product.to_json())

        return product_list
