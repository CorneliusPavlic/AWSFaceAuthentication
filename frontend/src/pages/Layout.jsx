import { Outlet, Link } from "react-router-dom";
import '../styles/Layout.css';  // Make sure to import the CSS file
import { useState } from 'react';

const Layout = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <>
      <nav>
        <ul className={dropdownVisible ? "show" : ""}>
          <li>
            <Link to="/">Login</Link>
          </li>
          {/* Add more links here as needed */}
        </ul>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
