# create a Django view for creating user instances using Django REST Framework (DRF)

from django.shortcuts import render  # Import render function from Django
from django.contrib.auth.models import User  # Import User model from Django's authentication system
from rest_framework import generics  # Import generics module from Django REST Framework
from.serializers import UserSerializer  # Import UserSerializer class from your serializers module
from rest_framework.permissions import IsAuthenticated, AllowAny  # Import permission classes from Django REST Framework

from .serializers import NoteSerializer
from .models import Note


# Create your views here.

class CreateUserView(generics.CreateAPIView):  # Define a view for creating users
    queryset = User.objects.all()  # Specify the queryset to fetch all User objects
    serializer_class = UserSerializer  # Specify the serializer class to use for serializing/deserializing User objects
    permission_classes = [AllowAny]  # Specify the permission classes to determine who can access this view


# Define the NoteListCreate class that inherits from DRF's ListCreateAPIView
# This class handles both GET requests for listing notes and POST requests for creating a new note
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer # Specify the serializer class to be used, which converts model instances to JSON and vice versa
    permission_classes = [IsAuthenticated]   # This ensures that only authenticated users can access this view
    
    # This method determines which note instances are returned on a GET request
    def get_queryset(self):
        user = self.request.user# Access the user from the request object (the user making the request)
        return Note.objects.filter(author=user)# Filter and return only the notes where the authenticated user is the author
        
    # This method is called during a POST request to save a new instance, ensuring the author field is set
    def perform_create(self, serializer):      
        if serializer.is_valid():      # First, check if the serializer has valid data
            serializer.save(author=self.request.user)# If the data is valid, save the instance with the current user as the author
        else:        
            print(serializer.errors)# Note: In production, you might want to handle errors differently (e.g., raising an exception or logging)
 
# This class handles DELETE requests for deleting Note instances           
class NoteDelete(generics.DestroyAPIView):
    serializer_class =NoteSerializer
    permission_classes = [IsAuthenticated]
    
     # This method returns the queryset of Note instances that are eligible for deletion
    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)





