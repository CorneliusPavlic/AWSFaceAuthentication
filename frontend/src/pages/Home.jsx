import "../styles/Home.css"; // Import the CSS file

const Home = () => {
  return (
    <div className="resume-container">
      <div className="profile-section">
        <h1>Cornelius Pavlic</h1>
        <p>Software Engineer</p>
      </div>

      <div className="contact-section">
        <h2>Contact Information</h2>
        <p>Email: cornelius.pavlic@gmail.com</p>
        <p>Phone: (440) 635-7702</p>
        <p>LinkedIn: <a href="www.linkedin.com/in/cornelius-pavlic-010956224">www.linkedin.com/in/cornelius-pavlic-010956224</a></p>
        <p>GitHub: <a href="https://github.com/CorneliusPavlic">https://github.com/CorneliusPavlic</a></p>
      </div>

      <div className="experience-section">
        <h2>Experience</h2>
        <div className="experience-item">
          <h3>Research Assistant</h3>
          <p>Kent State University</p>
          <p>May 2024 - Present</p>
          <ul>
            <li>Developed a web application interface with frontend and backend</li>
            <li>Developed a full program to segment and detect math equations including fractions.</li>
            <li>Trained a pre-existing model on a dataset in order to acheive higher accuracy</li>
            <li>Worked with a team to produce the product and fine-tune to the required specifications</li>
          </ul>
        </div>
        <div className="experience-item">
          <h3>Program Leader</h3>
          <p>Emeth Gymnastics</p>
          <p>December 2018 - Present</p>
          <ul>
            <li>Lead a team of coaches, including training and planning.</li>
            <li>Communicated with team members to develop useful lesson plans</li>
          </ul>
        </div>
      </div>

      <div className="education-section">
        <h2>Education</h2>
        <div className="education-item">
          <h3>Bachelor of Science in Computer Science</h3>
          <p>Kent State University</p>
          <p>2021-2025</p>
        </div>
      </div>

      <div className="skills-section">
        <h2>Skills</h2>
        <ul className="skills-list">
          <li>JavaScript</li>
          <li>React</li>
          <li>Python</li>
          <li>Git</li>
          <li>Communication</li>
          <li>Teamwork</li>
          <li>Pytorch</li>
          <li>OpenCV</li>
          <li>Problem Solving</li>
          <li>Artifical Intelligence</li>
        </ul>
      </div>
    </div>
      );
};

export default Home;
