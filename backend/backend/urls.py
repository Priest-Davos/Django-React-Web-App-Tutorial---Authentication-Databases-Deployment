
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


# This Django URL configuration defines the URL patterns for your Django project. Here's a breakdown of what each part of the code does:

# 1. **Imports**:
#    - `from django.contrib import admin`: This imports the admin module, which provides the Django admin interface.
#    - `from django.urls import path, include`: This imports the `path` function for defining URL patterns and the `include` function for including other URL configurations.
#    - `from api.views import CreateUserView`: This imports the `CreateUserView` class from the `api.views` module. This view is used for user registration.
#    - `from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView`: This imports views provided by the `rest_framework_simplejwt` package for obtaining and refreshing JWT tokens.

# 2. **URL Patterns**:
#    - `urlpatterns`: This is a list of URL patterns for your Django project.
#    - `path('admin/', admin.site.urls)`: This maps the URL `/admin/` to the Django admin interface.
#    - `path("api/user/register/", CreateUserView.as_view(), name="register")`: This maps the URL `/api/user/register/` to the `CreateUserView` view class. It allows users to register by sending a POST request to this URL.
#    - `path("api/token/", TokenObtainPairView.as_view(), name="get_token")`: This maps the URL `/api/token/` to the `TokenObtainPairView` view class. It is used for obtaining a JWT token by sending a POST request with valid credentials.
#    - `path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh")`: This maps the URL `/api/token/refresh/` to the `TokenRefreshView` view class. It is used for refreshing a JWT token by sending a POST request with a valid refresh token.
#    - `path("api-auth/", include("rest_framework.urls"))`: This includes the Django REST Framework's authentication URLs. It allows users to log in and log out using the browsable API interface provided by DRF.

# Overall, this URL configuration sets up endpoints for admin access, user registration, token authentication, token refreshing, and authentication using DRF's built-in views.