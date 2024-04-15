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
