import os
import json
import hmac, hashlib
import codecs
import requests
from threading import Thread
from django.core.mail import EmailMultiAlternatives


class EmailSender(Thread):
    def __init__(self, destination='', source='', subject='', content=''):
        Thread.__init__(self)
        self.destination = destination
        self.source = source
        self.content = content
        self.subject = subject

    def send(self):
        self.start()

    def run(self):
        try:
            email = EmailMultiAlternatives(
                self.subject,
                self.content,
                self.source,
                [self.destination]
            )

            email.attach_alternative(self.content, 'text/html')
            email.send()
        except AttributeError:
            pass


class Payment():
    def __init__(self, mode = 'dev'):
        # self.secret = os.getenv('SECRET_TOKEN', '929c3179d77ac2b4bf597efefe28788a0b5f1442c763643ee41d27d9522accd9')
        # self.url_token = os.getenv('URL_TOKEN', 'https://apis-dev.pgf.cl/users/login')
        # self.url_trxs = os.getenv('URL_TRXS', 'https://apis-dev.pgf.cl/trxs')
        # self.account_id = os.getenv('PAYMENT_ACCOUNT_ID', '737641ba698e805dbeb60e2118422e162231ca6a1b3bda6c71ce20dff4dcf28a')
        self.secret = os.getenv('SECRET_TOKEN', '4377a350f5ce889112d4fe2f18423183fc6d8bce3ae48bc2c32fc8eb1de2717a')
        self.url_token = os.getenv('URL_TOKEN', 'https://apis.pgf.cl/users/login')
        self.url_trxs = os.getenv('URL_TRXS', 'https://apis.pgf.cl/trxs')
        self.account_id = os.getenv('PAYMENT_ACCOUNT_ID', '437f505490cee975070a1632089197191ad45ed3a32780638568a4c3720b25cb')
        self.mode = mode

    def generate_authentication(self):
        auth_data = {
            'username': 'orlando.andaur.c@gmail.com',
            'password': 'Hola1423.'
        }

        headers = {
            'accept': "application/json",
            'content-type': "application/json"
        }

        response = requests.post(
            self.url_token,
            data=json.dumps(auth_data),
            headers=headers
        )
        return response.json()


    def _generate_signature(self, payload):
        msg = ''
        for key in sorted(payload.keys()):
            msg += '{}{}'.format(key, payload[key])

        return hmac.new(
            codecs.encode(self.secret),
            msg=codecs.encode(msg),
            digestmod=hashlib.sha256
        ).hexdigest()


    def generate_transaction(self, payload, purchase_order, customer, total_to_pay):
        if self.mode == 'dev':
            return self._fake_service()

        return self._production_service(payload, purchase_order, customer, total_to_pay)


    def _production_service(self, payload, purchase_order, customer, total_to_pay):
        currency = payload['currency']
        country = payload['country']
        session_id = payload['customer']

        success_url = 'http://localhost:8000/exito?purchase={}'.format(purchase_order.id)

        payload = {
            'x_account_id': self.account_id,
            'x_amount': int(total_to_pay),
            'x_currency': currency,
            'x_customer_email': customer.email,
            'x_reference': '{}-{}'.format(purchase_order.id, customer.uuid),
            'x_session_id': session_id,
            'x_shop_country': country,
            'x_url_cancel': os.getenv('PAYMENT_X_URL_CANCEL', 'http://dev.shop.com/buy/cancel'),
            'x_url_complete': os.getenv('PAYMENT_X_URL_COMPLETE', success_url),
            'x_url_callback': os.getenv('PAYMENT_X_URL_CALLBACK', 'http://dev.shop.com/')
        }

        payload['x_signature'] = self._generate_signature(payload)

        headers = {
            'accept': "application/json",
            'content-type': "application/json"
        }

        try:
            response = requests.post(
                self.url_trxs,
                data=json.dumps(payload),
                headers=headers
            )

            return response.json()

        except Exception as err:
            return False

    def _fake_service(self):
        return {
            'message': 'Trx creada exitosamente',
            'errors': None,
            'data': {
                'idTrx': 18851,
                'payUrl': [
                    {
                        'name': 'gateway',
                        'code': 'gateway',
                        'url': 'https://gw-dev.pagofacil.cl/payTransaction/?Authorization=MTg4NTE6ODg5ODkwNA=='
                    }
                ]
            }
        }

    def check_trxs_status(self, trxs):
        authentication = self.generate_authentication()['data']['access_token_jwt']
        url = 'https://apis.pgf.cl/trxs/{}'.format(trxs)

        headers = {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + authentication
        }

        response = requests.get(url, headers=headers)
        return response.json()
