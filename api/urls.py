from django.urls import path
from api import views

urlpatterns = [
    path('order', views.order, name='order'),
    path('auth/register', views.register, name='register'),
    path('auth/login', views.login, name='login'),
    path('auth/logout', views.logout, name='logout'),
    path('payment/<int:purchase>', views.payment, name='payment'),
    path('product/<str:sku>', views.product, name='product'),
]
