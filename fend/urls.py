from django.urls import path
from . import views

urlpatterns = [
    path('', views.index),
    #path('prod/', views.index),
    #path('cat/', views.index),
]
