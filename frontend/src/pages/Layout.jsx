import { Outlet, Link } from "react-router-dom";
import '../styles/Layout.css';  
import { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  let token = localStorage.getItem('authToken');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const removeToken = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  }

  return (
    <>
      <header>
        <Link to="/" className="logo">
          <img src="/AWSLogo.webp" alt="MyResume Logo" className="logo-image" />
          <div className="logo-text-container">
            <span className="logo-text">MyResume</span>
            <span className="logo-subtext">Professional Portfolio</span>
          </div>
        </Link>
        <Button
          id="basic-button"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
          startIcon={<MenuIcon style={{color: '#BB86FC'}}/>}
          className="menu-button"
        >
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={handleClose}>
            <Link to="/login" className="menu-link">Login</Link>
          </MenuItem>
          {!token && (
            <MenuItem onClick={handleClose}>
              <Link to="/signup" className="menu-link">Sign Up</Link>
            </MenuItem>
          )}
           {token && (
            <MenuItem onClick={() => {
              handleClose();
              removeToken(); }}>
              Sign Out
            </MenuItem>
          )}
          <MenuItem onClick={handleClose}>
            <Link to="/resume" className="menu-link">Resume</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/dashboard" className="menu-link">Dashboard</Link>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Link to="/projects" className="menu-link">Projects</Link>
          </MenuItem>
        </Menu>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
