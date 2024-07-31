import React, { useState } from 'react';
import '../styles/Projects.css';

const projects = [
    {
        title: "Blink",
        description: "This was a project for my Software Engineering Class, where we had to create a web application using SCRUM and Agile methodologies including weekly sprints and code displays, Along with Continuous Deployment and Testing checks with Github actions. We create a small horror game. With the use of P5Play. My major contributions to the project were the Blink detection for the game. I used Tensorflow.js to map facial landmarks and detect when the User is blinking, Level design, and the Inventory.",
        image: "/BlinkScreenShot.png",
        tags: ["JS", "JavaScript", "AI", "tensorflow", "Team", "SCRUM", "Agile", "Testing", "CI/CD"],
        githubLink: "https://github.com/Cars-n/blink",
        link: "https://cars-n.github.io/blink/"
    },
    {
        title: "Pain Point Percision",
        description: "This was a Hackathon project put together by a team of 3 of people and I. The goal of the project was to help people who may have issues with muscle pain but no base knowledge or access to a physical Therapist. So we imported a model of a person with all the muscles and had them select the area on the model that was hurt. Then they typed in when their pain occured and were given a repsonse with a list of exercises to help with the pain. And youtube videos detailing exercises. We used OpenAI's GPT-3 at the time for the list of exercises and Youtube's API for video selection.",
        image: "/PainPoint.png",
        tags: ["Vue", "Web Development", "Team", "API", "OpenAI", "AI", "LLM", "JS"],
        githubLink: "https://github.com/CorneliusPavlic/Public-Paint-Point-Percision",
        link: "https://corneliuspavlic.github.io/PainPointPercision/#/"
    },
    {
        title: "AWS Authentication",
        description: "This is the AWS Authentication Website, It was my first dive into hosting and running a website. I used AWS's Rekognition to detect faces and compare them to a database of faces. If the face was associated with the user they are logged in and it displays a dashboard. The dashboard would display the number of times the user logged in and the time of the last login. The website is hosted on an EC2 instance with an Elastic IP and a Route 53 domain.",
        image:"/AWSAuth.png",
        tags:["AWS", "Rekognition", "EC2", "S3", "RDS", "DynamoDB", "Route 53", "Hosting", "Cloud", "ML", "React", "JS"],
        githubLink: "https://github.com/CorneliusPavlic/AWSFaceAuthentication",
        link: "http://corneliuspavlic.com"
    },
    {
        title: "ScriptoMath",
        description: "This was my Project for the Summer of 2024 working as an Assistant Researcher for Kent State. The general Idea was to create a web app for Teachers to be able to upload math worksheets that students had filled out and have the app transcribe the contents. None of the current OCR's were able to handle the math equations. And certinaly not an entire sheet at a time. I used OpenCV, and a PaddleOCR model that I trained to recognize math symbols and digits and was able to achieve over 85% accuracy on the test data. ",
        image: "/ScriptoMath.png",
        tags: ["TensorFlow", "Python", "OpenCV", "PaddleOCR", "AI", "ML", "Research", "OCR"],
        githubLink: "https://github.com/CorneliusPavlic/homework-to-text",
        link:"https://Scriptomath.guans.cs.kent.edu"
    },
    {
        title: "AI Connect 4",
        description: "This was a Group project for my AI class with me and one other student. The goal was to create an AI that could play connect 4. We used the Minimax algorithm with Alpha-Beta Pruning to create the AI. and created a GUI for the game using Pygame. It performs remarkably well for the speed.",
        image: "/Connect4.png",
        tags:["Python", "AI", "Minimax", "Alpha-Beta Pruning", "Pygame", "GUI", "Team", "Algorithms"],
        githubLink: "https://github.com/CorneliusPavlic/Connect4AI"
    },
    {
        title: "CapesList",
        description: "CapesList is a website for Selling, Buying, and Trading Comic books. It was a group project, that created the website and the Backend for a simple app. Focusing on designing the Database. ",
        image: "/CapesList.png",
        tags:["PHP", "SQL", "Database", "Team", "Web Development", "Backend", "React"],
        githubLink: "https://github.com/CorneliusPavlic/CapesList"
    },
    {
        title: "Xri",
        description: "This is my current project. I'm working again as a Research Assistant for Kent State. The goal is to identify and track students in a classroom so that gaze data can be collected from both experienced teachers and student teachers and compared to improve the student teacher's teaching ability. It's using Yolov9 and ReID  for the tracking and identification. My goals are to improve the ReID and add more user friendly options for user to interact with the data.",
        image: "/xri.png",
        tags:["Python", "AI", "ML", "Research", "Yolov9", "ReID", "Tracking", "Identification"]
    }
];

const Projects = () => {
    const [expandedProject, setExpandedProject] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const handleExpand = (index) => {
        setExpandedProject(expandedProject === index ? null : index);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    const filteredProjects = projects.filter(project => 
        project.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );

    return (
        <div className="projects-container">
            <input 
                type="text"
                placeholder="Search by tags..."
                value={searchTerm}
                onChange={handleSearch}
                className="search-bar"
            />
            <div className="project-list">
                {filteredProjects.map((project, index) => (
                    <div 
                        key={index} 
                        className={`project-card ${expandedProject === index ? 'expanded' : ''}`}
                        onClick={() => handleExpand(index)}
                    >
                        <h3>{project.title}</h3>
                        <img src={project.image} alt={project.title} className="project-image"/>
                        {expandedProject === index && (
                            <div className="project-details">
                                <p>{project.description}</p>
                                <ul className="tag-list">
                                    {project.tags.map((tag, i) => (
                                        <li key={i} className="tag">{tag}</li>
                                    ))}
                                </ul>
                                <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="github-link">
                                    View on GitHub
                                </a> <br/>
                                {project.link && 
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="github-link">
                                    View Project 
                                </a>}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
