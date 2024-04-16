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
