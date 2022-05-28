from django.urls import path
from .views import ProductListView, ProductView, CreateProductView, UpdateProductView, DeleteProductView, greetings


urlpatterns = [
    #path('', greetings),
    path('', ProductListView.as_view()),
    path('<int:id>/', ProductView.as_view(), name='adetail'),
    path('new/', CreateProductView.as_view()),
    path('edit/<int:id>/', UpdateProductView.as_view(), name='aupdate'),
    path('del/<int:id>/', DeleteProductView.as_view(), name='adelete'),
    path('prods/', ProductListView.as_view()),
]
