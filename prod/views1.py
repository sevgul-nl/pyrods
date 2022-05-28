from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import generics,  status
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Product
# , CreateProductSerializer
from .serializers import ProductSerializer, ProductListSerializer, ProductEditSerializer
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser
from django.views.decorators.csrf import csrf_exempt

# Create your views here.


def greetings(request):
    # return HttpResponse("baki was here !..")
    return HttpResponse("<h1>baki was here !..</h1>")


class ProductListView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductListSerializer

    def get(self, request, format=None):
        context = {
            "prods": Product.objects.all()
        }
        return render(request, "prod_list.html", context)


class ProductView_old(generics.RetrieveAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()
    serializer_class = ProductEditSerializer

    def get(self, request, id):
        context = {
            "prod": Product.objects.all()
        }
        return render(request, "prod_detail.html", context)

    # def get(self, request, id):
    #    return HttpResponse(self.greeting)


class ProductView(generics.RetrieveAPIView):
    serializer_class = ProductEditSerializer
    lookup_field = "id"
    queryset = Product.objects.filter(id=id)

    def get(self, request, id):
        id = request.GET.get(self.lookup_field)
        if id != None:
            prod = Product.objects.filter(id=id)
            if len(prod) > 0:
                context = {
                    "prod": ProductEditSerializer(prod[0]).data
                }
                return render(request, "prod_detail.html", context)
            return Response({'Product Not Found': 'Invalid product id.'}, status=status.HTTP_404_NOT_FOUND)

        return Response({'Bad Request': 'Id paramater not found in request'}, status=status.HTTP_400_BAD_REQUEST)


def getProduct(request):
    greeting = "Good Day"
    return HttpResponse(greeting)


class CreateProductView1(generics.CreateAPIView):
    # parser_classes = [MultiPartParser]
    parser_classes = JSONParser
    serializer_class = ProductSerializer
    queryset = Product.objects.all()


class CreateProductView(APIView):
    serializer_class = ProductSerializer

    def post(self, request):

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # code = serializer.data.code
            name = serializer.data.get('name')
            describe = serializer.data.get('describe')
            product = Product(name=name, describe=describe)
            # print('here!..')
            product.save()
            # return Response(ProductSerializer(product).data, status=status.HTTP_201_CREATED)
            context = {
                "prods": Product.objects.all()
            }
            return render(request, "prod_list.html", context)

        return Response({'Bad Request': 'Invalid data...'}, status=status.HTTP_400_BAD_REQUEST)


class UpdateProductView(generics.RetrieveUpdateAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()
    serializer_class = ProductEditSerializer


class DeleteProductView(generics.DestroyAPIView):
    lookup_field = "id"
    queryset = Product.objects.all()


class CreateProductView2(generics.RetrieveAPIView):
    serializer_class = ProductSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            # code = serializer.data.code
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
