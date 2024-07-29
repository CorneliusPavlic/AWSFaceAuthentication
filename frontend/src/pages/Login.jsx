import { useEffect, useState } from "react";
import Camera from "../components/Camera";
import "../w3.css";
import "../styles/Login.css";

const Login = () => {
  const [photo, setPhoto] = useState("");
  const [formData, setFormData] = useState({ username: "", password: "", UserPhoto: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleCallback = (cameraData) => {
    setPhoto(cameraData);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedFormData = { ...formData, UserPhoto: photo };

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
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
