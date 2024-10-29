from django.db import models


class Effect(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }


class Category(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description
        }


class Product(models.Model):
    name = models.CharField(max_length=50)
    origin = models.CharField(max_length=50, blank=True)
    plant_part = models.CharField(max_length=50, blank=True)
    content = models.CharField(max_length=200, blank=True)
    security = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    price = models.FloatField()

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'security': self.security,
            'content': self.content,
            'plant_part': self.plant_part,
            'origin': self.origin
        }


class ProductProperty(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False)


class ProductEffect(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    effect = models.ForeignKey(Effect, on_delete=models.CASCADE, null=False, blank=False)

