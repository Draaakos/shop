import json


class LoginSchema:
    def __init__(self, payload):
        payload = json.loads(payload)
        self.email = payload['email']
        self.password = payload['password']


class RegisterSchema:
    def __init__(self, payload):
        payload = json.loads(payload)
        self.first_name = payload['firstName']
        self.last_name = payload['lastName']
        self.email = payload['email']
        self.phone = payload['phone']
        self.password = payload['password']
