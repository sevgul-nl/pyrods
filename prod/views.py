from django.views.generic import ListView, DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Product
from django.urls import reverse_lazy


class ProductListView(ListView):
    model = Product
    template_name = "prod_list.html"


class ProductView(DetailView):
    model = Product
    template_name = 'prod_detail.html'


class CreateProductView(CreateView):
    model = Product
    template_name = 'prod_detail.html'
    fields = ['name', 'describe']


class UpdateProductView(UpdateView):
    model = Product
    template_name = 'prod_detail.html'
    fields = ['name', 'describe']


class DeleteProductView(DeleteView):  # new
    model = Product
    template_name = 'prod_dedail.html'
    success_url = reverse_lazy('plist')
