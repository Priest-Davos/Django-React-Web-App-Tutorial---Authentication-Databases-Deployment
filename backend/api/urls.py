from django.urls import path
from . import views  # Import views module from the current directory


urlpatterns = [
    # Define a URL pattern for listing and creating notes. The path "notes/" corresponds to the base URL for notes
    # When a GET request is made to this URL, it will list all notes (NoteListCreate.as_view())
    # When a POST request is made to this URL, it will create a new note
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),

    # Define a URL pattern for deleting a specific note
    # The path "notes/delete/<int:pk>/" corresponds to the URL for deleting a note with a specific primary key (pk)
    # When a DELETE request is made to this URL with the primary key of the note, it will delete the corresponding note (NoteDelete.as_view())
    path("notes/delete/<int:pk>/", views.NoteDelete.as_view(), name="delete-note")
]
