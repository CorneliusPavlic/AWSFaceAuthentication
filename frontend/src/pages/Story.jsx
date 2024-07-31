import "../styles/Home.css"; // Import the CSS file
import { Link } from "react-router-dom";

const Story = () => {
  return (
    <div className="resume-container">
      <div className="profile-section">
        <h1>Welcome to My Website</h1>
      </div>

      <div className="contact-section">
        <div className="section">
          <h4>About Me:</h4>
          <p>Hi, I'm Cornelius, a Senior in Computer Science at Kent State University with a strong interest in AI, ML, Computer Vision, and Cloud technologies.</p>
        </div>
        <div className="section">
          <h4>Website Overview:</h4>
          <p>This website started as a project to learn AWS for my certification, and it evolved into my personal website and portfolio. Here’s what I’ve built:</p>
          <ul>
            <li><b>Secure Login:</b> Facial recognition using Amazon Rekognition.</li>
            <li><b>Dashboard:</b> Displays access count (requires login).</li>
            <li><b>Data Management:</b>
              <ul>
                <li><b>Login Information:</b> Stored in AWS RDS.</li>
                <li><b>Photos:</b> Stored in S3 buckets.</li>
                <li><b>Login Tracker:</b> Stored in DynamoDB.</li>
              </ul>
            </li>
            <li><b>Hosting:</b> Deployed on an EC2 instance with an elastic IP and a Route 53 domain.</li>
          </ul>
        </div>
        <div className="section">
          <h4>Looking for an Internship:</h4>
          <p>I'm seeking an internship for the Spring 2025 semester. Feel free to reach out with any opportunities at <a href="mailto:cornelius.pavlic@gmail.com">cornelius.pavlic@gmail.com</a>.</p>
        </div>
        <div className="section">
          <h4>Projects and Skills:</h4>
          <p><Link to="/projects">Click here for a list of all of my current projects</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Story;
