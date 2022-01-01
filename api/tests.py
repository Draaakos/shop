import json
from django.urls import reverse
from django.test import TestCase
from web.models import Customer
from web.models import Category
from web.models import Brand
from web.models import Product
from web.models import Purchase


class PurchaseOrderTestCase(TestCase):
    def setUp(self):
        category = Category.objects.create(name='category')
        brand = Brand.objects.create(name='brand')
        self.customer = Customer.objects.create(
            first_name='john',
            last_name='doe',
            email='john.doe@mailinator.com',
            phone='912312345'
        )
        Product.objects.create(
            name='product 1',
            sku='p1',
            price=20000,
            quantity=1,
            category=category,
            brand=brand
        )

    def test_purchase_ok(self):
        payload = json.dumps({
            'products': [{'sku': 'p1', 'quantity': 1}],
            'customer': str(self.customer.uuid),
            'address': 'some street #123'
        })
        response = self.client.post(
            reverse('api:order'),
            payload,
            content_type='application/json'
        )
        product = Product.objects.get(pk=1)
        purchase = Purchase.objects.get(pk=1)
        content = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content['success'], True)
        self.assertEqual(product.quantity, 0)
        self.assertEqual(purchase.status, Purchase.PENDING)

    def test_purchase_without_stock(self):
        payload = json.dumps({
            'products': [{'sku': 'p1', 'quantity': 5}],
            'customer': str(self.customer.uuid),
            'address': 'some street #123'
        })
        response = self.client.post(
            reverse('api:order'),
            payload,
            content_type='application/json'
        )
        product = Product.objects.get(pk=1)
        content = json.loads(response.content)
        orders_count = Purchase.objects.count()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content['success'], False)
        self.assertEqual(orders_count, 0)
        self.assertEqual(content['message'], 'no hay stock disponible para el producto product 1')
        self.assertEqual(product.quantity, 1)


class RegisterTestCase(TestCase):
    def test_success_register(self):
        payload = json.dumps({
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@mailinator.com',
            'phone': '987654321',
            'password': '123123'
        })
        response = self.client.post(
            reverse('api:register'),
            payload,
            content_type='application/json'
        )
        content = json.loads(response.content)
        count = Customer.objects.filter(email='john.doe@mailinator.com').count()
        self.assertEqual(response.status_code, 200)
        self.assertEqual(count, 1)


class LoginTestCase(TestCase):
    def test_user_exists(self):
        payload = json.dumps({
            'firstName': 'John',
            'lastName': 'Doe',
            'email': 'john.doe@mailinator.com',
            'phone': '987654321',
            'password': '123123'
        })
        response = self.client.post(
            reverse('api:register'),
            payload,
            content_type='applicatio/json'
        )
        content = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content['success'], True)

        payload = json.dumps({
            'email': 'john.doe@mailinator.com',
            'password': '123123'
        })
        response = self.client.post(
            reverse('api:login'),
            payload,
            content_type='application/json'
        )
        content = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content['success'], True)
        self.assertIsNotNone(content['result']['uuid'])

    def test_user_does_not_exist(self):
        payload = json.dumps({
            'email': 'john.perez@mailinator.com',
            'password': '123123'
        })
        response = self.client.post(
            reverse('api:login'),
            payload,
            content_type='application/json'
        )
        content = json.loads(response.content)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(content['success'], False)
        self.assertEqual(content['message'], 'Usuario y/o clave erroneos')
