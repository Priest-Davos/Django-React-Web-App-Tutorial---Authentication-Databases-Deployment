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

// // Response interceptor for handling global errors or token refresh logic
// api.interceptors.response.use(
//     response => response, // Just return the response if no errors
//     error => {
//         // Check if it's a token expiry error
//         if (error.response.status === 401) {
//             const refreshToken = localStorage.getItem(REFRESH_TOKEN);
//             // You can add a function to handle token refresh
//             return refreshTokenAndRetryRequest(refreshToken, error.config);
//         }
//         return Promise.reject(error);
//     }
// );

// // Example function to handle refreshing of tokens
// async function refreshTokenAndRetryRequest(refreshToken, originalRequest) {
//     try {
//         // API call to refresh token
//         const response = await axios.post('http://your-api-url.com/refresh', { refreshToken });
//         const { accessToken } = response.data;
//         localStorage.setItem(ACCESS_TOKEN, accessToken); // Update the access token
//         // Update the original request with new token
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//         // Retry the original request with new token
//         return api(originalRequest);
//     } catch (refreshError) {
//         localStorage.removeItem(ACCESS_TOKEN);
//         localStorage.removeItem(REFRESH_TOKEN);
//         // Redirect to login or do something else on token refresh failure
//         return Promise.reject(refreshError);
//     }
// }

export default api;
