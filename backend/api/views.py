# create a Django view for creating user instances using Django REST Framework (DRF)

from django.shortcuts import render  # Import render function from Django
from django.contrib.auth.models import User  # Import User model from Django's authentication system
from rest_framework import generics  # Import generics module from Django REST Framework
from.serializers import UserSerializer  # Import UserSerializer class from your serializers module
from rest_framework.permissions import IsAuthenticated, AllowAny  # Import permission classes from Django REST Framework

# Create your views here.

class CreateUserView(generics.CreateAPIView):  # Define a view for creating users
    queryset = User.objects.all()  # Specify the queryset to fetch all User objects
    serializer_class = UserSerializer  # Specify the serializer class to use for serializing/deserializing User objects
    permission_classes = [AllowAny]  # Specify the permission classes to determine who can access this view
