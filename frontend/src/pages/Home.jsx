import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="resume-container">
      <div className="profile-section">
        <h1>John Doe</h1>
        <p>Web Developer</p>
      </div>

      <div className="contact-section">
        <h2>Contact Information</h2>
        <p>Email: johndoe@example.com</p>
        <p>Phone: (123) 456-7890</p>
        <p>LinkedIn: linkedin.com/in/johndoe</p>
        <p>GitHub: github.com/johndoe</p>
      </div>

      <div className="experience-section">
        <h2>Experience</h2>
        <div className="experience-item">
          <h3>Senior Web Developer</h3>
          <p>Company ABC</p>
          <p>Jan 2020 - Present</p>
          <ul>
            <li>Developed and maintained web applications using React and Node.js</li>
            <li>Led a team of 5 developers to deliver projects on time</li>
            <li>Implemented responsive design to improve user experience</li>
          </ul>
        </div>
        <div className="experience-item">
          <h3>Web Developer</h3>
          <p>Company XYZ</p>
          <p>Jun 2017 - Dec 2019</p>
          <ul>
            <li>Created and optimized websites using HTML, CSS, and JavaScript</li>
            <li>Collaborated with designers to create user-friendly interfaces</li>
            <li>Performed code reviews and mentored junior developers</li>
          </ul>
        </div>
      </div>

      <div className="education-section">
        <h2>Education</h2>
        <div className="education-item">
          <h3>Bachelor of Science in Computer Science</h3>
          <p>University of Somewhere</p>
          <p>2013 - 2017</p>
        </div>
      </div>

      <div className="skills-section">
        <h2>Skills</h2>
        <ul className="skills-list">
          <li>JavaScript</li>
          <li>React</li>
          <li>Node.js</li>
          <li>HTML & CSS</li>
          <li>Git</li>
          <li>REST APIs</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
