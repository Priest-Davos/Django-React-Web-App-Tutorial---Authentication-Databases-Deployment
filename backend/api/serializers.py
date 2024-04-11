from django.contrib.auth.models import User  # Import the User model from Django's authentication system
from rest_framework import serializers  # Import serializers from Django REST Framework

from .models import Note # Import the Note model from the models.py file in the same directory

class UserSerializer(serializers.ModelSerializer):  # Define a serializer for the User model
    class Meta:  # Meta class to specify metadata options
        model = User  # Specify the User model for the serializer
        fields = ["id", "username" , "password"]  # Specify the fields to include in the serialized representation
        extra_kwargs = {"password": {"write_only": True}}  # Specify additional options for the password field
    
    def create(self, validated_data):  # Method to create a new user
        # Create a new user instance using the validated data
        user = User.objects.create_user(**validated_data)
        return user  # Return the newly created user instance


# Define a class NoteSerializer that inherits from serializers.ModelSerializer. This class will be responsible for converting Note instances into JSON format and vice-versa
class NoteSerializer(serializers.ModelSerializer):
    # Meta class is used to provide metadata to the NoteSerializer class
    class Meta:        
        model = Note# Specify the model associated with this serializer
        # Define the fields that should be included in the serialized output
        # This allows you to be explicit about what data should be made available over your API
        fields = ['id', 'title', 'content', 'created_at', 'author']
        # Specify fields that should be read-only
        # read_only_fields are included in the serialized output but are not expected or modified in the input
        # 'author' is set to read-only to prevent it from being modified through the API directly
        read_only_fields = ('author', 'created_at',)



