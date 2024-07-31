import { useState } from "react";
import Camera from "../components/Camera";
import "../styles/Login.css"; // Reuse the same CSS for consistency

const SignUp = () => {
    const [photo, setPhoto] = useState("");
    const [formData, setFormData] = useState({ username: "", password: "", UserPhoto: "" });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleCallback = (cameraData) => {
        setPhoto(cameraData);
        setFile(null); // Clear file input if camera is used
    };

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhoto(reader.result);
                setFile(selectedFile);
            };
            reader.readAsDataURL(selectedFile); // Read the file as a data URL
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formData.password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            return;
        }

        const updatedFormData = { ...formData, UserPhoto: photo };

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            });

            if (!response.ok) {
                let errorMessage;
                switch (response.status) {
                    case 400:
                        errorMessage = 'Bad Request. Please check the input data.';
                        break;
                    case 401:
                        errorMessage = 'Unauthorized. Please check your credentials.';
                        break;
                    case 403:
                        errorMessage = 'Forbidden. You do not have permission to perform this action.';
                        break;
                    case 404:
                        errorMessage = 'Not Found. The requested resource could not be found.';
                        break;
                    case 409:
                        errorMessage = "This username is already taken. Please choose another one.";
                        break;
                    case 500:
                        errorMessage = 'Internal Server Error. Please try again later.';
                        break;
                    default:
                        errorMessage = 'An error occurred. Please try again.';
                }
                setErrorMessage(errorMessage);
            }
            const result = await response.json();
            if (result.token) {
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('authToken', result.token);
                window.location.href = '/login';
            } else {
                setErrorMessage('No token received');
            }
        } catch (error) {
            console.error('Error:', error);
            setErrorMessage('Failed to sign up. Please try again.');
        }
    };

    return (
        <div className="container">
            <Camera className="camera" callback={handleCallback} />
            <form onSubmit={handleSubmit}>
                <label htmlFor="user">UserName:</label>
                <input
                    type="text"
                    id="user"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    placeholder="Username"
                />
                <label htmlFor="pword">Password:</label>
                <input
                    type="password"
                    id="pword"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    placeholder="Password"
                />
                <label htmlFor="confirmpword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmpword"
                    name="confirmpassword"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                />
                <label htmlFor="photoUpload">Upload a picture to identify you with or take a picture with the webcam:</label>
                <input
                    type="file"
                    id="photoUpload"
                    accept="image/*"
                    onChange={handleFileChange}
                />
                <input type="submit" value="Submit" />
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default SignUp;
