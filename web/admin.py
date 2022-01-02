from django.contrib import admin
from web.models import Category
from web.models import Product
from web.models import ProductImage
from web.models import Customer
from web.models import Size
from web.models import Color
from web.models import Purchase
from web.models import PurchaseDetail
from web.models import Platform
from web.models import ProductPlatform
from web.models import Requeriment
from web.models import Stock
from web.models import Slider


class InlineImages(admin.StackedInline):
    model = ProductImage
    extra = 3


class InlinePurchaseDetail(admin.StackedInline):
    model = PurchaseDetail
    extra = 3


@admin.register(Slider)
class SliderAdmin(admin.ModelAdmin):
    ordering = ['id',]
    list_display = ['id', 'image']
    list_editable = ['image']


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    ordering = ['id',]
    list_display = ['id', 'name']
    list_editable = ['name']
    list_filter = ['name']


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = [
        'id',
        'name',
        'sku',
        'price',
        'before_price',
        'quantity',
        'category',
        'requeriment',
        'related_skus'
    ]
    list_editable = [
        'name',
        'sku',
        'price',
        'before_price',
        'quantity',
        'category',
        'requeriment',
        'related_skus'
    ]
    list_filter = ['category']
    inlines = [InlineImages]


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['is_default', 'product', 'image']
    list_filter = ['product', 'image']


@admin.register(Customer)
class Customer(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'first_name', 'last_name', 'email', 'phone']
    list_editable = ['first_name', 'last_name', 'email', 'phone']
    list_filter = ['last_name']


@admin.register(Size)
class SizeAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'name']
    list_editable = ['name']


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'name', 'hexcolor']
    list_editable = ['name', 'hexcolor']


@admin.register(Purchase)
class PurchaseAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'date', 'customer', 'status', 'zip_code', 'address']
    inlines = [InlinePurchaseDetail]


@admin.register(Platform)
class PlatformAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'name']
    list_editable = ['name']


@admin.register(ProductPlatform)
class ProductPlatformAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'product', 'platform']
    list_editable = ['product', 'platform']


@admin.register(Requeriment)
class RequerimentAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'minimun', 'recommended', 'so', 'proccesor', 'memory', 'graphics', 'storage']
    list_editable = ['minimun', 'recommended', 'so', 'proccesor', 'memory', 'graphics', 'storage']


@admin.register(Stock)
class StockAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'product_key', 'product', 'status']
    list_editable = ['product_key', 'product', 'status']
