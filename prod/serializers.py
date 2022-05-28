from dataclasses import fields
from pyexpat import model
from rest_framework import serializers
from rest_framework.reverse import reverse
from prod.models import Product


class ProductListSerializer(serializers.ModelSerializer):
    purl = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ('id', 'name', 'describe', 'purl')

    def get_purl(self, obj):
        return reverse('adetail', args=(obj.pk,))
        # return 'test'


class ProductSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('id',  'name', 'describe', 'created',  'edited', 'state')
        lookup_field = 'id'


class ProductSerializer(serializers.ModelSerializer):
    # images = ImageSerializer(many=True,required=False)
    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'describe',
            'created',
            'edited',
            'state',
        ]


class ProductEditSerializer(serializers.ModelSerializer):
    update = serializers.SerializerMethodField()
    delete = serializers.SerializerMethodField()

    # images = ImageSerializer(many=True,required=False)

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'describe',
            'created',
            'edited',
            'state',
            'update',
            'delete',
        ]

    def get_update(self, obj):
        return reverse('aupdate', args=(obj.pk,))

    def get_delete(self, obj):
        return reverse('adelete', args=(obj.pk,))
