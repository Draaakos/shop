from django.conf import settings
from django.urls import path, re_path
from django.conf.urls.static import static
from django.contrib.staticfiles import views as vius
from . import views


urlpatterns = [
    path('', views.home, name='home'),
    path('productos', views.product_list, name='plp'),
    path(
        'categoria/<str:category_name>/<str:sku>/<str:product_name>',
        views.product_detail,
        name='pdp'
    ),
    path('carrito', views.basket, name='basket'),
    path('login', views.login, name='login'),
    path('register', views.register, name='register'),
    path('checkout', views.checkout, name='checkout'),
    path('perfil', views.profile, name='profile'),
    path('exito', views.success, name='success'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
