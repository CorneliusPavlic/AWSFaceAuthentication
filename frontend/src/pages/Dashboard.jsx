import { useEffect, useState } from "react";
import "../styles/Dashboard.css"; // Import the CSS file

const Dashboard = () => {
  const [visitors, setVisitors] = useState(0);

  useEffect(() => {
    // Replace '/api/visitors' with the actual endpoint of your API
    const fetchVisitors = async () => {
      try {
        const response = await fetch('/api/visitors');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setVisitors(data.visitors);
      } catch (error) {
        console.error('Error fetching visitors:', error);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Congrats, you made it to the Dashboard</h1>
      <p className="visitors-count">Number of visitors: {visitors}</p>
    </div>
  );
};

export default Dashboard;
