import uuid
from django.db import models
from web.utils import define_product_path, define_slider_path
from web.exceptions.model import NotEnoughQuantityError

class Slider(models.Model):
    name = models.CharField(max_length=100)
    image = models.ImageField(null=True, blank=True, upload_to=define_slider_path)

    def __str__(self):
        return f'{self.id} -> {self.name}'

    def to_json(self):
        return {
            'id': self.id,
            'url': self.image.url
        }


class Category(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.id} -> {self.name}'

    class Meta:
        verbose_name = 'Categoria'


class Size(models.Model):
    name = models.CharField(max_length=20)

    def __str__(self):
        return f'{self.id} -> {self.name}'


class Color(models.Model):
    name = models.CharField(max_length=20)
    hexcolor = models.CharField(max_length=10)

    def __str__(self):
        return f'{self.id} -> {self.name}'


class Platform(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return f'{self.id} -> {self.name}'


class Requeriment(models.Model):
    minimun = models.CharField(max_length=200)
    recommended = models.CharField(max_length=200)
    so = models.CharField(max_length=50)
    proccesor = models.CharField(max_length=50)
    memory = models.CharField(max_length=50)
    graphics = models.CharField(max_length=50)
    storage = models.CharField(max_length=50)

    def to_json(self):
        return {
            'minimun': self.minimun,
            'recommended': self.recommended,
            'so': self.so,
            'proccesor': self.proccesor,
            'memory': self.memory,
            'graphics': self.graphics,
            'storage': self.storage
        }

    def __str__(self):
        return f'{self.id} -> {self.minimun}'

    class Meta:
        verbose_name = 'Requerimientos'


class Product(models.Model):
    name = models.CharField(max_length=200)
    sku = models.CharField(max_length=30)
    price = models.FloatField()
    before_price = models.FloatField(default=0)
    quantity = models.IntegerField()
    # platform = models.ForeignKey(Platform, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    size = models.ForeignKey(Size, on_delete=models.CASCADE, null=True, blank=True)
    color = models.ForeignKey(Color, on_delete=models.CASCADE, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    related_skus = models.CharField(max_length=500, null=True, blank=True)
    requeriment = models.ForeignKey(Requeriment, on_delete=models.CASCADE, null=True, blank=True)


    def discount_quantity(self, quantity):
        if self.quantity < quantity:
            msg = f'no hay stock disponible para el producto {self.name}'
            raise NotEnoughQuantityError(msg)

        self.quantity -= quantity

    def __str__(self):
        return f'{self.id} -> {self.name}'

    class Meta:
        verbose_name = 'Producto'


class ProductPlatform(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    platform = models.ForeignKey(Platform, on_delete=models.CASCADE)


class ProductImage(models.Model):
    is_default = models.BooleanField(null=True, blank=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    image = models.ImageField(null=True, blank=True, upload_to=define_product_path)

    def __str__(self):
        return f'{self.id} -> ({self.product.id}){self.product.name}'

    class Meta:
        verbose_name = 'Imagen de producto'
        verbose_name_plural = 'Imagenes de producto'


class Customer(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=100)
    phone = models.CharField(max_length=50, null=True, blank=True)
    uuid = models.UUIDField(default=uuid.uuid4)
    password = models.CharField(max_length=100)

    def __str__(self):
        return f'{self.id} -> {self.last_name} {self.first_name}'

    class Meta:
        verbose_name = 'Cliente'


class Purchase(models.Model):
    PENDING = 'pending'
    CANCELLED = 'cancelled'
    DONE = 'done'
    PURCHASE_STATUSES = [
        (PENDING, 'pending'),
        (CANCELLED, 'cancelled'),
        (DONE, 'done')
    ]
    date = models.DateTimeField(auto_now_add=True)
    address = models.TextField()
    zip_code = models.CharField(max_length=40, null=True, blank=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    status = models.CharField(max_length=30, choices=PURCHASE_STATUSES, default=PENDING)
    transaction_key = models.CharField(blank=True, max_length=255)
    transaction_url = models.CharField(blank=True, max_length=255)

    def __str__(self):
        return f'{self.id} -> {self.date} {self.customer}'

    class Meta:
        verbose_name = 'Compra'


class PurchaseDetail(models.Model):
    purchase = models.ForeignKey(Purchase, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    class Meta:
        verbose_name = 'Detalle de compra'


class Stock(models.Model):
    product_key = models.CharField(max_length=200)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True, blank=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return f'{self.id} -> {self.product_key}'

    class Meta:
        verbose_name = 'Stock'
