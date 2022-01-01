import hashlib


def define_product_path(instance, filename):
    code = hashlib.md5()
    code.update(str(instance.product.category.id).encode())
    category_folder = code.hexdigest()
    code.update(str(instance.product.id).encode())
    product_folder = code.hexdigest()
    return f'{category_folder}/{product_folder}/{filename}'
