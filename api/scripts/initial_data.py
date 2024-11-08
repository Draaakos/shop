import json
from api.models import Product
from api.models import Category
from api.models import ProductCategory
from api.models import ProductApplication
from api.models import Tag, ProductTag


def insert_category(category_name):
    if not len(Category.objects.filter(name=category_name)):
        category = Category()
        category.name = category_name
        category.save()


def insert_tag(tag_name):
    if not len(Tag.objects.filter(name=tag_name)):
        tag = Tag()
        tag.name = tag_name
        tag.save()


def run():
    with open('data.json', 'r') as file:
        data = json.load(file)

        for item in data:
            for category in item['categories']:
                insert_category(category)


            for application in item['application']:
                for tag in application['tag']:
                    insert_tag(tag)


            product = Product()
            product.id = item['id']
            product.name = item['name']
            product.origin = item['origin']
            product.security = item['security']
            product.description = item['description']
            product.pure = item['pure']
            product.plant_part = item['part']
            product.price = 0
            product.use_aromatic = item['usage']['aromatic']
            product.use_topical = item['usage']['topical']
            product.use_internal = item['usage']['internal']
            product.save()


            for application in item['application']:
                if len(ProductApplication.objects.filter(name=application['name'], product=product)) == 0:
                    product_application = ProductApplication()
                    product_application.name = application['name']
                    product_application.description = application['description']
                    product_application.product = product
                    product_application.save()


            for category_name in item['categories']:
                category = Category.objects.get(name=category_name)

                if len(ProductCategory.objects.filter(product=product, category=category)) == 0:
                    product_category = ProductCategory()
                    product_category.product = product
                    product_category.category = category
                    product_category.save()

            for application in item['application']:
                for tag_name in application['tag']:
                    tag = Tag.objects.get(name=tag_name)

                    if len(ProductTag.objects.filter(product=product, tag=tag)) == 0:
                        product_tag = ProductTag()
                        product_tag.product = product
                        product_tag.tag = tag
                        product_tag.save()

            # for tag in item['name']:
            #     tags = Tag.objects.filter()

