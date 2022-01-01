import json
import datetime
from django.conf import settings
from django.views.generic import View
from django.db import transaction
from django.http import JsonResponse
from web.models import Product
from web.models import Purchase
from web.models import PurchaseDetail
from web.models import Customer
from web.exceptions.model import NotEnoughQuantityError
from helpers.logger import create_logger
from helpers.jsonoutput import success
from helpers.jsonoutput import error
from api.services import EmailSender
from api.services import Payment


logger = create_logger('purchaseOrder')

class OrderView(View):
    def post(self, request):
        payload = json.loads(request.body)
        logger.debug('sending payload', payload)

        try:
            customer = Customer.objects.get(uuid=payload['customer'])
            purchase_order = self._create_purchase_order(payload)
            output = self._create_order_information(payload, purchase_order)
            total_to_pay = self._calculate_total_to_pay(payload['products'])
            payment = Payment().generate_transaction(payload, purchase_order, customer, total_to_pay)

            if payment == False or payment.get('errors') is not None:
                print(payment['errors'])
                purchase_order.delete()
                return JsonResponse(success({
                        "msg": "hubo un error en el pago",
                        "errors": payment['errors']
                    })
                )

            update_purchase_order = self._update_purchase_order(purchase_order, payment)
            # self.send_customer_email(payload, purchase_order)
            return JsonResponse(success({'output': output, 'payment': payment }))

        except NotEnoughQuantityError as nostock:
            logger.error(nostock)
            return JsonResponse(error(str(nostock)))

    @transaction.atomic
    def _create_purchase_order(self, payload):
        today = datetime.date.today()
        customer = Customer.objects.get(uuid=payload['customer'])

        purchase = Purchase()
        purchase.date = today
        purchase.customer = customer
        purchase.address = payload['address']
        purchase.zip_code = payload.get('zipCode', None)
        purchase.save()

        for product_payload in payload['products']:
            product = Product.objects.get(sku=product_payload['sku'])
            quantity = product_payload['quantity']
            product.discount_quantity(quantity)

            detail = PurchaseDetail()
            detail.purchase = purchase
            detail.product = product
            detail.quantity = quantity

            product.save()
            detail.save()

        return purchase

    def _update_purchase_order(self, order, payment):
        idTrx = payment['data']['idTrx']
        payUrl = payment['data']['payUrl'][0]['url']
        order.transaction_key = idTrx
        order.transaction_url = payUrl
        order.save()

    def _create_order_information(self, payload, order):
        def get_details(od):
            return {
                'sku': od.product.sku,
                'name': od.product.name,
                'quantity': od.quantity,
                'price': od.product.price
            }
        details = [get_details(od) for od in order.purchasedetail_set.all()]

        return {
            'orderId': order.id,
            'address': payload['address'],
            'details': details
        }

    # def send_customer_email(self, payload, purchase_order):
    #     destination = purchase_order.customer.email
    #     source = settings.EMAIL_HOST_USER
    #     subject = 'email de prueba oe'
    #     content = 'contenido de email'

    #     sender = EmailSender(destination, source, subject, content)
    #     sender.send()

    def _calculate_total_to_pay(self, products):
        iva = 0
        total = 0
        for product in products:
            item = Product.objects.get(sku=product['sku'])
            total = total + (item.price + (item.price * iva))
        return total
