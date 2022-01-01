from django.contrib import admin
from web.models import Category
from web.models import Product
from web.models import ProductImage
from web.models import Customer
from web.models import Size
from web.models import Color
from web.models import Purchase
from web.models import PurchaseDetail
from web.models import Brand


class InlineImages(admin.StackedInline):
    model = ProductImage
    extra = 3


class InlinePurchaseDetail(admin.StackedInline):
    model = PurchaseDetail
    extra = 3


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
        'size',
        'color',
        'category',
        'related_skus'
    ]
    list_editable = [
        'name',
        'sku',
        'price',
        'before_price',
        'quantity',
        'size',
        'color',
        'category',
        'related_skus'
    ]
    list_filter = ['category']
    inlines = [InlineImages]


@admin.register(ProductImage)
class ProductImageAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['is_default', 'product', 'image']
    list_filter = ['product']


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


@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display = ['id', 'name']
    list_editable = ['name']
