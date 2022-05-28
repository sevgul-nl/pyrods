from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics,  status
from rest_framework.response import Response
from rest_framework.views import APIView
from prod.models import Product
# , CreateProductSerializer
from prod.serializers import ProductSerializer, ProductEditSerializer, ProductListSerializer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def greetings(request):
    # return HttpResponse("baki was here !..")
    return HttpResponse("<h1>baki was here !..</h1>")


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer


# class ProductView(generics.CreateAPIView):
class ProductView(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()
    serializer_class = ProductEditSerializer


class CreateProductView1(generics.CreateAPIView):
    #parser_classes = [MultiPartParser]
    parser_classes = JSONParser
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class CreateProductView(APIView):
    serializer_class = ProductSerializer

    def post(self, request, format=None):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #code = serializer.data.code
            name = serializer.data.get('name')
            describe = serializer.data.get('describe')
            product = Product(name=name, describe=describe)
            # print('here!..')
            product.save()
            return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateProductView(generics.RetrieveUpdateAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()
    serializer_class = ProductEditSerializer


class DeleteProductView(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()


class CreateProductView2(APIView):
    serializer_class = ProductSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            #code = serializer.data.code
            name = serializer.data.get('name')
            describe = serializer.data.get('describe')
            host = self.request.session.session_key
            queryset = Product.objects.filter(host=host)
            if queryset.exists():
                product = queryset[0]
                product.name = name
                product.describe = describe
                product.save(update_fields=['name', 'describe'])
                return Response(ProductSerializer(product).data, status=status.HTTP_200_OK)
            else:
                product = Product(host=host, name=name, describe=describe)
                product.save()
                return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)

            return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)
