from api.models import Tag, ProductTag, ProductCategory, ProductApplication


class DTO:
    def __init__(self, product):
        self.product = product

    def _fetch_applications(self):
        applications = []
        for product_application in ProductApplication.objects.filter(product=self.product):
            applications.append({
                'name': product_application.name,
                'description': product_application.description
            })
        return applications

    def _fetch_categories(self):
        categories = []
        for product_category in ProductCategory.objects.filter(product=self.product):
            categories.append(product_category.category.name)
        return categories

    def _fetch_tags(self):
        tags = []
        for product_tag in ProductTag.objects.filter(product=self.product):
            tags.append(product_tag.tag.name)
        return tags

    def to_json(self):
        return {
            'id': self.product.id,
            'name': self.product.name,
            'description': self.product.description,
            'usage': {
                "aromatic": self.product.use_aromatic,
                "topical": self.product.use_topical,
                "internal": self.product.use_internal
            },
            'tags': self._fetch_tags(),
            'categories': self._fetch_categories(),
            'applications': self._fetch_applications()
        }
