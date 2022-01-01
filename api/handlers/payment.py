from django.views.generic import View
from django.template import Context
from django.http import JsonResponse
from django.conf import settings
from api.services import Payment
from web.models import Purchase
from web.models import Product
from web.models import PurchaseDetail
from api.services import EmailSender

class PaymentView(View):
    def __init__(self):
        self.amount = 0
        self.order = 0

    def get(self, request, **kwargs):
        purchase_id = kwargs.get('purchase')
        purchase = Purchase.objects.get(pk=purchase_id)
        purchase = self._check_payment(purchase.transaction_key, purchase)
        products = self._get_products(purchase_id)

        if purchase.status == "COMPLETADA":
            self._send_customer_email(products, purchase.customer)

        return JsonResponse({
            'products': products,
            'transaction': {
                'status': purchase.status,
                'transactionUrl': purchase.transaction_url,
                'amount': self.amount,
                'order': self.order
            }
        })

    def _get_products(self, purchase_id):
        products_list = []
        product_list_detail = PurchaseDetail.objects.filter(purchase_id=purchase_id)
        for product_detail in product_list_detail:
            product = Product.objects.get(pk=product_detail.product_id)
            products_list.append({
                'id': product.id,
                'name': product.name,
                'sku': product.sku,
                'price': product.price + (product.price * 0.19),
                'quantity': product_detail.quantity,
                'images': self._get_images(product)
            })
        return products_list

    def _check_payment(self, transaction_key, purchase):
        payment = Payment().check_trxs_status(transaction_key)
        return self._update_payment_status(payment, purchase)


    def _send_customer_email(self, products, customer):
        destination = customer.email
        source = settings.EMAIL_HOST_USER
        subject = 'Compra validada'

        product_text = ''
        for product in products:
            person_ctx = {
                'name': product['name'],
                'sku': product['sku'],
                'price': int(product['price'])
            }

            product_text = product_text + """
                <tr>
                    <td style="padding: 1em;">{name}</td>
                    <td style="padding: 1em;">{sku}</td>
                    <td style="padding: 1em;">$ {price}</td>
                </tr>
            """.format(**person_ctx)

        content = """
            <section>
                <h2>
                    Felicidades {} pudimos validar tu compra!
                </h2>

                <table>
                    <thead>
                        <tr>
                            <td style="padding: 1em;">Nombre</td>
                            <td style="padding: 1em;">SKU</td>
                            <td style="padding: 1em;">Precio</td>
                        </tr>
                    </thead>

                    <tbody>{}</tbody>
                </table>
            </section>
        """.format(customer.first_name, product_text)

        sender = EmailSender(destination, source, subject, content)
        sender.send()


    def _update_payment_status(self, payment, purchase):
        self.amount = payment['data']['amount']
        self.order = payment['data']['orderIdTienda']

        purchase.status = payment['data']['status']
        purchase.save()
        return purchase

    def _get_images(self, product):
        xs = []
        images = product.productimage_set.all()

        for image in images:
            pi = _ProductImage(image)
            xs.append(pi.to_json())

        return xs


class _ProductImage:
    def __init__(self, image):
        self.image = image

    def to_json(self):
        return {
            'url': self.image.image.url
        }
