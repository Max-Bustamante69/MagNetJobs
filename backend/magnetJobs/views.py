from django.shortcuts import render

# Create your views here.
# views.py
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Post  # Importa tu modelo
from .serializers import PostSerializer  # Importa tu serializer

class PostCreateView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # Para manejar archivos y datos en el request

    def post(self, request, *args, **kwargs):
        # Cargar los datos usando el serializer
        serializer = PostSerializer(data=request.data)
        
        # Validar los datos
        if serializer.is_valid():
            serializer.save()  # Guardar el nuevo post en la base de datos
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        # Si los datos no son válidos, devolver un error
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)