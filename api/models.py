from django.db import models


class Tag(models.Model):
    name = models.CharField(max_length=50)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Category(models.Model):
    name = models.CharField(max_length=50)

    def to_json(self):
        return {
            'id': self.id,
            'name': self.name
        }


class Product(models.Model):
    name = models.CharField(max_length=50)
    security = models.CharField(max_length=100)
    description = models.CharField(max_length=255)

    origin = models.CharField(max_length=50, blank=True)
    plant_part = models.CharField(max_length=50, blank=True)
    content = models.CharField(max_length=200, blank=True)
    preparation = models.CharField(max_length=255, blank=True)
    pure = models.BooleanField(blank=True)
    price = models.FloatField(blank=True)

    use_aromatic = models.CharField(max_length=100, blank=True)
    use_topical = models.CharField(max_length=100, blank=True)
    use_internal = models.CharField(max_length=100, blank=True)


    def to_json(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'description': self.description,
            'security': self.security,
            'content': self.content,
            'plant_part': self.plant_part,
            'origin': self.origin,
            'usage': {
                "aromatic": self.use_aromatic,
                "topical": self.use_topical,
                "internal": self.use_internal
            }
        }


class ProductCategory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False)


class ProductApplication(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=255)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)


class ProductTag(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    tag = models.ForeignKey(Tag, on_delete=models.CASCADE, null=False, blank=False)


# Approach (Enfoque): Relajación, Sueño, Refuerzo Inmunológico, Salud Respiratoria
# Effect (Propiedades en pagina): Analgésico, antiinflamatorio, antiséptico, antioxidante, estimulante circulatorio y pulmonar.
# Antidote (Antídoto): Insomnio, Estrés, Ansiedad
