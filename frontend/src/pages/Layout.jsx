import { Outlet, Link } from "react-router-dom";
import '../styles/Layout.css';  // Make sure to import the CSS file
import { useEffect, useState } from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Layout = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const token = localStorage.getItem('authToken');
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <><div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<MenuIcon />}
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
          <MenuItem onClick={handleClose}><Link to="/">Login</Link></MenuItem>
          {!token && <MenuItem onClick={handleClose}><Link to="/signup">Sign Up</Link></MenuItem>}
          <MenuItem onClick={handleClose}><Link to="/home">Home</Link></MenuItem>
          <MenuItem onClick={handleClose}><Link to="/dashboard">Dashboard</Link></MenuItem>
      </Menu>
    </div><main>
        <Outlet />
      </main></>
  );
};

export default Layout;
