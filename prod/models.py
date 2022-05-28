from django.db import models
from django.urls import reverse
import datetime
import random
import string

# Create your models here.


def codegenerator():
    length = 6
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Product.objects.filter(code=code).count() == 0:
            break

    return code


class Product(models.Model):
    # code = models.CharField(
    #    max_length=8, default=codegenerator, unique=True)
    #host = models.CharField(max_length=50, unique=True)
    name = models.CharField(max_length=16, default='name', null=False)
    describe = models.CharField(max_length=25, default='describe', null=True)
    # image = models.ImageField(upload_to='pimages')
    # image = models.ImageField(upload_to='prod/images',
    #                          blank=True,
    #                          default="prod/images/prod.png"
    #                          )
    created = models.DateTimeField(auto_created=True, null=True)
    edited = models.DateTimeField(auto_now=True, null=True)
    state = models.CharField(max_length=1, default='1', null=False)

    def get_absolute_url(self):
        return reverse('pdetail', args=[str(self.id)])


class Category(models.Model):
    # code = models.CharField(
    #    max_length=6, default=codegenerator, unique=True)
    #host = models.CharField(max_length=50)
    name = models.CharField(max_length=16, default='name', null=False)
    created = models.DateTimeField(auto_created=True, null=True)
    edited = models.DateTimeField(auto_now=True, null=True)
    state = models.CharField(max_length=1, default='1', null=False)


class Review(models.Model):
    # code = models.CharField(
    #    max_length=4, default=codegenerator, unique=True)
    content = models.TextField()
    #host = models.CharField(max_length=50, unique=True)
    rating = models.IntegerField()
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_created=True, null=True)
    edited = models.DateTimeField(auto_now=True, null=True)
    state = models.CharField(max_length=1, default='1', null=False)


def codegenerator(length):
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))
        if Product.objects.filter(code=code).count() == 0:
            break

    return code
