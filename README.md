# Django-React-Web-App-Tutorial---Authentication-Databases-Deployment
 see full project flow after screenshots
![Screenshot (132)](https://github.com/Priest-Davos/Django-React-Web-App-Tutorial---Authentication-Databases-Deployment/assets/112301378/40ff7441-2d02-4af7-839f-294ddd1feb32)
![Screenshot (133)](https://github.com/Priest-Davos/Django-React-Web-App-Tutorial---Authentication-Databases-Deployment/assets/112301378/cd4ab382-e0b4-4955-99fc-58e7f25f8a12)
![Screenshot (134)](https://github.com/Priest-Davos/Django-React-Web-App-Tutorial---Authentication-Databases-Deployment/assets/112301378/f6171c91-1032-4a71-9cc3-992efafa3ecc)
![Screenshot (135)](https://github.com/Priest-Davos/Django-React-Web-App-Tutorial---Authentication-Databases-Deployment/assets/112301378/3f073ee6-3944-406d-99eb-7707e144c917)
![Screenshot 2024-04-16 073409](https://github.com/Priest-Davos/Django-React-Web-App-Tutorial---Authentication-Databases-Deployment/assets/112301378/967714ad-b863-45e2-9a14-3d271d91a8a4)

#Project Flow
create a folder in system for project ...

Initialize git // if want

create a virtusl environment
 -----------> python -m venv env

Activate tha environment
------------> env\Scripts\activate

Add a .gitignore file and write there .env

create a requirement.txt file
Here list all required dependencies

install all dependencies of requirement.txt file
-------------> pip istall -r requirement.txt

creates a new Django project named "backend"
-------------> django-admin startproject backend

cd to backend

 create a new Django app using the startapp command, 
-------------> python manage.py startapp <app_name>

update setting.py file // copy the file
backend\backend\settings.py

Undersatand jwt tokens ....

Create registration view

-> create a serializer for the Django User model using Django REST Framework. It serializes/deserializes User instances to/from JSON representations.
     crearte a file serializer.py in app(api) folder
     code:---------------------------------------------------
     from django.contrib.auth.models import User  # Import the User model from Django's authentication system
     from rest_framework import serializers  # Import serializers from Django REST Framework

     class UserSerializer(serializers.ModelSerializer):  # Define a serializer for the User model
        class Meta:  # Meta class to specify metadata options
          model = User  # Specify the User model for the serializer
          fields = ["id", "username" , "password"]  # Specify the fields to include in the serialized representation
          extra_kwargs = {"password": {"write_only": True}}  # Specify additional options for the password field
    
        def create(self, validated_data):  # Method to create a new user
        # Create a new user instance using the validated data
         user = User.objects.create_user(**validated_data)
          return user  # Return the newly created user instance



->create a Django view for creating user instances using Django REST Framework (DRF)
 update views.py
 code:-----------------------------------------------------------------------
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

-> connecting our Auth routes
   goto urls.py in backened and update
   # This Django URL configuration defines the URL patterns for your Django project. Here's a breakdown of what each part of the code does:

   code:-
         from django.contrib import admin  # Import the admin module
         from django.urls import path, include  # Import functions for defining URL patterns
         from api.views import CreateUserView  # Import the CreateUserView class for user registration
         from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView  # Import views for JWT token management

         # Define URL patterns
         urlpatterns = [
             path('admin/', admin.site.urls),  # Map the URL '/admin/' to the Django admin interface
             path("api/user/register/", CreateUserView.as_view(), name="register"),  # Map the URL '/api/user/register/' to the CreateUserView for user registration
             path("api/token/", TokenObtainPairView.as_view(), name="get_token"),  # Map the URL '/api/token/' to the TokenObtainPairView for obtaining JWT tokens
             path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),  # Map the URL '/api/token/refresh/' to the TokenRefreshView for refreshing JWT tokens
             path("api-auth/", include("rest_framework.urls")),  # Include the Django REST Framework's authentication URLs
         ]

-> Now in terminal( cd to backened)
The makemigrations cmd is used to generate new migration files based on changes you have made to your models. These migration files define the operations that need to be applied to the database schema to make it match the changes you've made to your models.
-------python manage.py makemigrations
--------python manage.py migrate

---------python manage.py runserver

 Now go to route ---/api/user/register/
       ->create new user
       -> now goto  ---/api/token/ 
              ->generate access and refresh token by entering the user credential


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Now create custom models
 goto models.py in api folder and work there

 code:
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
            # The related_name="notes" allows access to a user's notes by calling user.notes.all(),
            # providing a straightforward way to retrieve all notes by a particular user.
            author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
          
            # This method returns the note's title when its object is called,
            # making it easier to identify the note instance, especially in the Django admin interface.
            def __str__(self):
                return self.title
        

Now create a serializer for this model 
   A serializer will allow you to easily convert Note instances into JSON format for API responses and vice-versa, from JSON to Note instances for creating or updating notes via your API.
   ->update serializer.py

          # Import the serializers module from Django Rest Framework
           from rest_framework import serializers
           # Import the Note model from the models.py file in the same directory
           from .models import Note
           
           # Define a class NoteSerializer that inherits from serializers.ModelSerializer
           # This class will be responsible for converting Note instances into JSON format and vice-versa
           class NoteSerializer(serializers.ModelSerializer):
               # Meta class is used to provide metadata to the NoteSerializer class
               class Meta:
                   # Specify the model associated with this serializer
                   model = Note
                   # Define the fields that should be included in the serialized output
                   # This allows you to be explicit about what data should be made available over your API
                   fields = ['id', 'title', 'content', 'created_at', 'author']
                   # Specify fields that should be read-only
                   # read_only_fields are included in the serialized output but are not expected or modified in the input
                   # 'author' is set to read-only to prevent it from being modified through the API directly
                   # This is common for fields that are automatically populated by the model or by the logic in your views
                   read_only_fields = ('author', 'created_at',)


(00:38:-)  Now create views for create , read , delete notes   
    update views.py  ++
            from .serializers import NoteSerializer
            from .models import Note

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
                         
             
 ->Now setup urls for them  
    create urls.py file in api folder 
    code :-----
        from django.urls import path
        from . import views  # Import views module from the current directory
        # Define the URL patterns for the API
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

Now Link these urls from this file to backend / urls.py file
     update backend/urls.py  ++

         path("api/",include("api.urls")) #By including "api.urls", you're telling Django to include all URL patterns defined in the urls.py file of your api app.


Now update database schema .ie migrate in cmd


    python manage.py makemigrations
        o/p------>Migrations for 'api':
            api\migrations\0001_initial.py
            - Create model Note

    python manage.py migrate
        o/p----> Operations to perform:
                Apply all migrations: admin, api, auth, contenttypes, sessions
                Running migrations:
                Applying api.0001_initial... OK

Now run server to check------------------------------


++++++++++++++++++++++++++     Frontend setup in React      ++++++++++++++++++++++++++++++++++++++++++++++

cd to base directory
setup rect using vite
in terminal 
    -> npm create vite@latest
    -> cd Frontend
    -> npm install

install some packeges
     -> npm install axios react-router-dom jwt-decode

    

Now Frontend organization and Axios setup(00:52:00)
->In src folder
      -> create some directories
      1> pages , 2> styles , 3> components
      
      ->create files
      1> constants.js , 2> api.js 

-> In frotend directory 
        -> create .env file
              -> Here
               VITE_API_URL="https://locahost:8080"


Now in constants.js
   defining constants for token keys,.. to be used in managing JWT tokens for authentication in your application
   code :
            export const  ACCESS_TOKEN="access"
            export const REFRESH_TOKEN="refresh"

Now in api.js
    Add Interceptors to Attach Tokens: You can automatically attach tokens to all outgoing requests. This ensures that every API call made through Axios includes the necessary authentication headers
        code:-
            import axios from 'axios';
            import { ACCESS_TOKEN, REFRESH_TOKEN } from './constants'; // Assuming these are defined as shown previously

            // Create an instance of axios
            const api = axios.create({
                baseURL: import.meta.env.VITE_API_URL
            });

            // Request interceptor to attach the token to requests
            api.interceptors.request.use(
                (config) => {
                    const token = localStorage.getItem(ACCESS_TOKEN);
                    if (token) {
                        config.headers['Authorization'] = `Bearer ${token}`;
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            export default api;


Now to get tokens and protect our routes
    ->create a component ProtectedRoute.jsx in components folder

    code : -

                import { Navigate } from "react-router-dom";
                import { jwtDecode } from "jwt-decode";
                import api from "../api";
                import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
                import { useState, useEffect } from "react";

                function ProtectedRoute({ children }) {
                    const [isAuthorized, setIsAuthorized] = useState(null);

                    useEffect(() => {
                        // On component mount, check if the user is authorized
                        auth().catch(() => setIsAuthorized(false));
                    }, []);

                    const refreshToken = async () => {
                        try {
                            // Retrieve the refresh token from local storage
                            const refreshToken = localStorage.getItem(REFRESH_TOKEN);
                            // Request a new access token using the refresh token
                            const res = await api.post("/api/token/refresh/", {
                                refresh: refreshToken,
                            });
                            // If token refresh is successful, update the access token in local storage
                            if (res.status === 200) {
                                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                                setIsAuthorized(true); // User is authorized
                            } else {
                                // Token refresh failed, set authorized to false
                                throw new Error("Token refresh failed");
                            }
                        } catch (error) {
                            // Log and handle token refresh errors
                            console.error("Error refreshing token:", error);
                            setIsAuthorized(false); // User is not authorized
                        }
                    };

                    const auth = async () => {
                        const token = localStorage.getItem(ACCESS_TOKEN);
                        if (!token) {
                            // If access token is not present, user is not authorized
                            setIsAuthorized(false);
                            return;
                        }
                        const decoded = jwtDecode(token);
                        const tokenExpiration = decoded.exp;
                        const now = Date.now() / 1000;

                        if (tokenExpiration < now) {
                            // Token has expired, attempt to refresh it
                            await refreshToken();
                        } else {
                            // Token is still valid, user is authorized
                            setIsAuthorized(true);
                        }
                    };

                    if (isAuthorized === null) {
                        // Loading state while authentication status is being determined
                        return <div>Loading...</div>;
                    }

                    // Render children if user is authorized, otherwise redirect to login
                    return isAuthorized ? children : <Navigate to="/login" />;
                }

                export default ProtectedRoute;


Now setup some navigation and pages(1:08:-) 
   create some component in pages folder
   1. Home.jsx
   2. Login.jsx
   3. Register.jsx
   4. NotFound.jsx

   write som initial code in all (use shortcut .. rfce )


Now setup App.jsx
        code : -
            // Import necessary React and React Router components
            import React from "react";
            import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
            import Login from "./pages/Login";
            import Register from "./pages/Register";
            import Home from "./pages/Home";
            import NotFound from "./pages/NotFound";
            import ProtectedRoute from "./components/ProtectedRoute";
            
            // Logout component clears all stored tokens and navigates to login page
            function Logout() {
              localStorage.clear(); // Clear all local storage items
              return <Navigate to="/login" />; // Redirect to login page
            }
            
            // RegisterAndLogout component clears storage and renders the Register component
            function RegisterAndLogout() {
              localStorage.clear(); // Clear all local storage items
              return <Register />; // Render Register page
            }
            
            // Main App component that defines the routing for the application
            function App() {
              return (
                <BrowserRouter>
                  <Routes>
                    <Route
                      path="/" // Main route that is protected
                      element={
                        <ProtectedRoute> // Only allow access if user is authenticated
                          <Home /> // Home component for authenticated users
                        </ProtectedRoute>
                      }
                    />
                    <Route path="/login" element={<Login />} /> // Route for the login page
                    <Route path="/logout" element={<Logout />} /> // Route for logging out
                    <Route path="/register" element={<RegisterAndLogout />} /> // Route for registration and logout
                    <Route path="*" element={<NotFound />}></Route> // Route for handling undefined paths
                  </Routes>
                </BrowserRouter>
              );
            }
            
            export default App; // Export the App component as the default export
            
    // App component sets up the routing for your application using React Router. Here's an overview of what each part of the code does:
    // Import Statements: Import necessary modules and components from React and React Router.
    // Logout Function: Defines a Logout component, which clears the localStorage and redirects the user to the login page using the Navigate component from React Router.
    // RegisterAndLogout Function: Defines a RegisterAndLogout component, which clears the localStorage and renders the Register component.
    // App Function Component: Defines the main App component, which serves as the entry point of your application.
    // BrowserRouter: Wraps the entire application with the BrowserRouter component, which provides the routing functionality to the application.
    // Routes: Inside the Routes component, define the routes for different pages of your application.
    // Route Components: Each Route component defines a route with a specific path and corresponding component to render.
    // The first Route component is a protected route ("/") that renders the Home component wrapped in the ProtectedRoute component. This ensures that the Home component is only accessible to authenticated users.
    // The second Route component defines the "/login" route, which renders the Login component.
    // The third Route component defines the "/logout" route, which renders the Logout component when accessed.
    // The fourth Route component defines the "/register" route, which renders the RegisterAndLogout component when accessed.
    // The fifth Route component defines a wildcard route ("*") for handling any other routes not matched by the above routes. It renders the NotFound component.
    // Export Default: Export the App component as the default export.         
                
    

_________________________________________________________

Now work on components (1:16:-)

-> NotFound.jsx
 
    code :-
            import React from "react";
            function NotFound() {
              return (
                <div style={{ textAlign: "center", margin: "50px"   , backgroundColor:"cyan", padding:"3rem"}}>
                  <h1>404 Not Found</h1>
                  <p>The page you are looking for doesn't exist or has been moved.</p>
                </div>
              );
            }

            export default NotFound;

Make a generic form to handle both login and register
->So create a Form.jsx component in components directory
        code:-
            import { useState } from "react";
            import api from "../api"; // API abstraction for making HTTP requests
            import { useNavigate } from "react-router-dom"; // Hook for navigation
            import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"; // Token constants
            import "../styles/Form.css" // Styles specific to forms
            // import LoadingIndicator from "./LoadingIndicator"; // UI component to indicate loading process

            function Form({ route, method }) {
                const [username, setUsername] = useState(""); // State to store the username input
                const [password, setPassword] = useState(""); // State to store the password input
                const [loading, setLoading] = useState(false); // State to handle the display of the loading indicator
                const navigate = useNavigate(); // Hook to redirect users

                const name = method === "login" ? "Login" : "Register"; // Set button/form title based on the method

                const handleSubmit = async (e) => {
                    setLoading(true);
                    e.preventDefault(); // Prevent the default form submit behavior

                    try {
                        const response = await api.post(route, { username, password }) // Make a POST request to the server
                        if (method === "login") {
                            // Store access and refresh tokens in localStorage
                            localStorage.setItem(ACCESS_TOKEN, response.data.access);
                            localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
                            navigate("/"); // Navigate to the home page after successful login
                        } else {
                            navigate("/login"); // Navigate to the login page after successful registration
                        }
                    } catch (error) {
                        alert(error); // Show an error alert if there is an issue with login or registration
                    } finally {
                        setLoading(false); // Ensure loading is set to false after the process is complete
                    }
                };

                return (
                    <form onSubmit={handleSubmit} className="form-container">
                        <h1>{name}</h1>
                        <input
                            className="form-input"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                        />
                        <input
                            className="form-input"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                        />
                        {loading && <LoadingIndicator />} // Show loading indicator while processing
                        <button className="form-button" type="submit">
                            {name}
                        </button>
                    </form>
                );
            }

            export default Form; // Export the component for use in other parts of the app

-> For styling  create form.css in styles folder
      code :- copy paste


Now connecting the Login or register Form(1:26:-)
-> so setup Register.js
        code :-
            import React from 'react'
            import Form from '../components/Form'

            function Register() {
              return (
                <Form route="/api/user/register/" method="register"></Form>
              )
            }

            export default Register

 -> setup Login.jsx
        code :-
            import React from 'react'
            import Form from '../components/Form'

            function Login() {
              return (
                <Form route="/api/token/" method="login"></Form>
              )
            }

            export default Login


All set 

----------Now check the Login & Register working in UI -------
Open terminal
  ----> start backend
  ----> copy the server url
          ->http://127.0.0.1:8000/
  ----> Paste it in .env file in Vite_api_url
      -> VITE_API_URL="http://127.0.0.1:8000/"
  ----> start frontend and check working


commit 13

++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Home component does few things related to 
 * managing notes,
 * including fetching existing notes, 
 * deleting a note, and 
 * creating new ones. etc

Now Build Home Page (1:31:-)
---Before that
-copy all styles file as it is as no logic
-create a note component in components directory
    -> it displays individual notes

    code :-
            import React from "react";
            import "../styles/Note.css"

            // Note component that displays individual notes
            function Note({ note, onDelete }) {
                // Format the creation date of the note to local string
                const formattedDate = new Date(note.created_at).toLocaleDateString("en-US");

                return (
                    <div className="note-container">
                        {/* Display the title of the note */}
                        <p className="note-title">{note.title}</p>
                        {/* Display the content of the note */}
                        <p className="note-content">{note.content}</p>
                        {/* Display the formatted creation date of the note */}
                        <p className="note-date">{formattedDate}</p>
                        {/* Button to trigger deletion of a note using its id */}
                        <button className="delete-button" onClick={() => onDelete(note.id)}>
                            Delete
                        </button>
                    </div>
                );
            }

            export default Note;

Now work in Home component
        code :- 
            import { useState, useEffect } from "react";
            import api from "../api";
            import Note from "../components/Note"
            import "../styles/Home.css"

            function Home() {
              // State variables to manage notes, title, and content of notes
              const [notes, setNotes] = useState([]);
              const [content, setContent] = useState("");
              const [title, setTitle] = useState("");

              // Effect to fetch notes on component mount
              useEffect(() => {
                getNotes();
              }, []);

              // Function to fetch notes from the server
              const getNotes = () => {
                api.get("/api/notes/")
                  .then((res) => res.data)
                  .then((data) => {
                    setNotes(data);  // Set fetched notes to state
                    console.log(data);  // Log data for debugging
                  })
                  .catch((err) => alert(err));  // Handle any errors
              };

              // Function to handle deleting a note
              const deleteNote = (id) => {
                api.delete(`/api/notes/delete/${id}/`)
                  .then((res) => {
                    if (res.status === 204) alert("Note deleted!");  // Notify successful deletion
                    else alert("Failed to delete note.");  // Notify failure
                    getNotes();  // Refresh notes after deletion
                  })
                  .catch((error) => alert(error));  // Handle errors
              };

              // Function to handle creating a new note
              const createNote = (e) => {
                e.preventDefault();  // Prevent default form submission behavior
                api.post("/api/notes/", { content, title })
                  .then((res) => {
                    if (res.status === 201) alert("Note created!");  // Notify successful creation
                    else alert("Failed to make note.");  // Notify failure
                    getNotes();  // Refresh notes after creating
                  })
                  .catch((err) => alert(err));  // Handle errors
              };

              return (
                <div>
                  <div>
                    <h2>Notes</h2>
                    {/* Map over notes and pass each note to the Note component */}
                    {notes.map((note) => (
                      <Note note={note} onDelete={deleteNote} key={note.id} />
                    ))}
                  </div>
                  <h2>Create a Note</h2>
                  {/* Form for creating a new note */}
                  <form onSubmit={createNote}>
                    <label htmlFor="title">Title:</label>
                    <br />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      required
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                    <label htmlFor="content">Content:</label>
                    <br />
                    <textarea
                      id="content"
                      name="content"
                      required
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <br />
                    <input type="submit" value="Submit"></input>
                  </form>
                </div>
              );
            }

            export default Home;

Now create a LoadingIndicator component in components directory
        code :-
            import "../styles/LoadingIndicator.css"
            const LoadingIndicator = () => {
                return <div className="loading-container">
                    <div className="loader"></div>
                </div>
            }
            export default LoadingIndicator

Now add this loadingIndicator in Form.jsx which is being used in Login and register component
---Update Form.jsx ++
     check Form.jsx for whole code
      {loading && <LoadingIndicator />} {/* Show loading indicator while processing */}


+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
create LogoutButton component  and its css file
    in LogoutButton.jsx
            code :-
                import React from 'react';
                import { useNavigate } from 'react-router-dom';
                import '../styles/LogoutButton.css';
                function LogoutButton() {
                    const navigate = useNavigate();

                    const handleLogout = () => {
                        // Clear local storage or any other clean-up tasks
                        localStorage.clear();

                        // Navigate to the login page or any other appropriate page
                        navigate('/login');
                    };

                    return (
                        <button onClick={handleLogout} className="logout-button">
                            Logout
                        </button>
                    );
                }

                export default LogoutButton;

Now update Home.jsx  ...++
  Add this Button tn return after heading
        -><LogoutButton></LogoutButton>

=====================================================================================================
                       Deployment setup  (1:52:-)
 ===================                      =====================
