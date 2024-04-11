from django.db import models
from django.contrib.auth.models import User

# This class defines the structure of the Note objects in the database.
class Note(models.Model):
    # A short text field limited to 100 characters for the note's title.
    title = models.CharField(max_length=100)
    
    # A large text field for the note's content. No maximum length is enforced.
    content = models.TextField()
    
    # A date and time field that automatically sets to the note's creation time.
    created_at = models.DateTimeField(auto_now_add=True)
    
    # A reference to the User model, establishing a many-to-one relationship.
    # Each note is linked to a single user, but a user can have many notes.
    # The on_delete=models.CASCADE argument ensures that when a user is deleted,
    # all their notes are also deleted from the database.
    # The related_name="notes" allows access to a user's notes by calling user.notes.all(), providing a straightforward way to retrieve all notes by a particular user.
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
  
    # This method returns the note's title when its object is called, making it easier to identify the note instance, especially in the Django admin interface.
    def __str__(self):
        return self.title
