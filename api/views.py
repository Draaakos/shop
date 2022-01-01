from api.handlers.order import OrderView
from api.handlers.auth import RegisterView
from api.handlers.auth import LoginView
from api.handlers.auth import LogoutView
from api.handlers.payment import PaymentView
from api.handlers.product import ProductView


order = OrderView.as_view()
register = RegisterView.as_view()
login = LoginView.as_view()
logout = LogoutView.as_view()
payment = PaymentView.as_view()
product = ProductView.as_view()
