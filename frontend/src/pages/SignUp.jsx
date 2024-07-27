import { useState } from "react";
import Camera from "../components/Camera";

const SignUp = () => {
    const [photo, setPhoto] = useState("");
    const [formData, setFormData] = useState({username: "", password: "", UserPhoto:""});
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState(null);

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
            alert("Passwords do not match");
            return;
        }
        
        const updatedFormData = ({...formData, "UserPhoto": photo});

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFormData)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            if (result.token) {
                // Store the token in localStorage or sessionStorage
                localStorage.setItem('authToken', result.token);
                window.location.href = '/dashboard';
            } else {
                console.error('No token received');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <>
            <Camera callback={handleCallback}/>
            <label htmlFor="user">UserName:</label><br/>
            <input type="text" id="user" name="username" onChange={handleChange} value={formData.username} placeholder="Username"/><br/>
            <label htmlFor="pword">Password:</label><br/>
            <input type="password" id="pword" name="password" onChange={handleChange} value={formData.password} placeholder="Password" /><br/>
            <label htmlFor="confirmpword">Confirm Password:</label><br/>
            <input type="password" id="confirmpword" name="confirmpassword" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Confirm Password" /><br/>
            
            <label htmlFor="photoUpload">Upload a profile picture:</label><br/>
            <input type="file" id="photoUpload" accept="image/*" onChange={handleFileChange} /><br/>
            
            <input type="submit" value="Submit" onClick={handleSubmit}/>
        </>
    );
}

export default SignUp;
