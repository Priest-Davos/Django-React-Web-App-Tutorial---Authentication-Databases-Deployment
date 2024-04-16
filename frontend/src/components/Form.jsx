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
            {/*loading && <LoadingIndicator />*/} {/* Show loading indicator while processing */}
            <button className="form-button" type="submit">
                {name}
            </button>
        </form>
    );
}

export default Form; // Export the component for use in other parts of the app
