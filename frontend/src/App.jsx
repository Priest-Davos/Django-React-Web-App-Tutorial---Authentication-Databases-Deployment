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
            <ProtectedRoute> {/* Only allow access if user is authenticated*/}
          <Home /> {/* Home component for authenticated users*/}
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