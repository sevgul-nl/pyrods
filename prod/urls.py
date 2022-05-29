from django.urls import path
from .views import ProductListView, ProductView, CreateProductView, UpdateProductView, DeleteProductView


urlpatterns = [
    #path('', greetings),
    path('', ProductListView.as_view(), name='plist'),
    path('<int:pk>/', ProductView.as_view(), name='pdetail'),
    #path('<int:id>/', getProduct, name='pdetail'),
    path('new/', CreateProductView.as_view()),
    path('edit/<int:pk>/', UpdateProductView.as_view(), name='pupdate'),
    path('del/<int:pk>/', DeleteProductView.as_view(), name='pdelete'),
    path('prods/', ProductListView.as_view()),
]
