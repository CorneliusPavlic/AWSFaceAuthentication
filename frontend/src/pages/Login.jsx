import { useEffect, useState } from "react";
import Camera from "../components/Camera";
import "../w3.css"
import "../styles/Login.css"
const Login = () => {
    const [photo, setPhoto] = useState("");
    const [formData, setFormData] = useState({username: "", password: "", UserPhoto:""});
    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }
    const handleCallback = (cameraData) => {
        setPhoto(cameraData);
    }
    const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = ({...formData, "UserPhoto": photo});

    try {
        const response = await fetch('/api/login', {
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
    <div>
    <Camera className="camera" callback={handleCallback}/>
    </div>
    <label for="user">UserName:</label><br/>
    <input type="text" id="user" name="username" onChange={handleChange} value={formData.username} placeholder="Username"/><br/>
     <label for="pword">Password:</label><br/>
    <input type="text" id="pword" name="password" onChange={handleChange} value={formData.password} placeholder="Password" /><br/>
    <input type="submit" value="Submit" onClick={handleSubmit}/>
    </>
  );
}


export default Login;