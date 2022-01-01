import json
import hashlib
from django.views.generic import View
from django.db import transaction
from django.http import JsonResponse
from django.shortcuts import redirect
from web.models import Customer
from helpers.jsonoutput import error
from helpers.jsonoutput import success
from helpers.logger import create_logger
from api.schemas.auth import LoginSchema
from api.schemas.auth import RegisterSchema


logger = create_logger('AUTH')


class RegisterView(View):
    def post(self, request):
        payload = RegisterSchema(request.body)
        customer = self.create_new_customer(payload)
        logger.info(f'created new user with email {payload.email}')
        output = {'uuid': str(customer.uuid)}

        return JsonResponse(success(output))

    @transaction.atomic
    def create_new_customer(self, payload: RegisterSchema) -> Customer:
        password = hashlib.sha1(payload.password.encode())

        customer = Customer()
        customer.first_name = payload.first_name
        customer.last_name = payload.last_name
        customer.email = payload.email
        customer.phone = payload.phone
        customer.password = password.hexdigest()
        customer.save()

        return customer


class LoginView(View):
    def post(self, request):
        payload = LoginSchema(request.body)

        try:
            customer = self.get_customer(payload)

            output = {
                'uuid': str(customer.uuid),
                'firstName': customer.first_name,
                'lastName': customer.last_name,
                'phone': customer.phone
            }

            session_information = {
                'firstName': customer.first_name,
                'lastName': customer.last_name,
                'phone': customer.phone
            }

            request.session['uuid'] = str(customer.uuid)
            request.session['session_information'] = session_information
            request.session['is_logged'] = True

            return JsonResponse(success(output))
        except Customer.DoesNotExist as err:
            message = 'Usuario y/o clave erroneos'
            return JsonResponse(error(message))

    def get_customer(self, payload: LoginSchema) -> Customer:
        email = payload.email
        password = hashlib.sha1(payload.password.encode()).hexdigest()
        customer = Customer.objects.get(email=email, password=password)

        return customer


class LogoutView(View):
    def get(self, request):
        request.session.flush()
        return redirect('web:home')
