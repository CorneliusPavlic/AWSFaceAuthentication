import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('authToken');
            if (token) {
                const valid = await verifyTokenWithServer(token);
                setIsAuthenticated(valid);
            } else {
                setIsAuthenticated(false);
            }
        };

        checkToken();
    }, []);

    // Render a loading state while checking authentication
    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? Component : <Navigate to="/" />;
};

async function verifyTokenWithServer(token) {
    try {
        const response = await fetch('/api/verify-token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ token })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);
        return result.valid; // Assume the server returns { valid: true } or { valid: false }
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

export default ProtectedRoute;
