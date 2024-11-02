from django.db import models


class Application(models.Model):
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
    security = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    price = models.FloatField()

    origin = models.CharField(max_length=50, blank=True)
    plant_part = models.CharField(max_length=50, blank=True)
    content = models.CharField(max_length=200, blank=True)
    preparation = models.CharField(max_length=255, blank=True)

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


class ProductCategory(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False, blank=False)


class ProductApplication(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False, blank=False)
    application = models.ForeignKey(Application, on_delete=models.CASCADE, null=False, blank=False)



# Approach (Enfoque): Relajación, Sueño, Refuerzo Inmunológico, Salud Respiratoria
# Effect (Propiedades en pagina): Analgésico, antiinflamatorio, antiséptico, antioxidante, estimulante circulatorio y pulmonar.
# Antidote (Antídoto): Insomnio, Estrés, Ansiedad
