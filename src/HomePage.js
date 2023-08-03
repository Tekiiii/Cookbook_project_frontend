// components/HomePage.js
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon } from '@mui/icons-material';

const HomePage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [entities, setEntities] = useState([]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const handleMenuClick = (event) => {
    console.log('Clicked menu item: ', event.target.innerText);
    setIsDrawerOpen(false);
    if (event.target.innerText === 'Home') {
      fetchEntities();
    }
  };

  const fetchEntities = async () => {
    try {
      const response = await fetch('YOUR_BACKEND_API_URL/entities');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setEntities(data);
    } catch (error) {
      console.error('Error fetching entities:', error);
    }
  };

  useEffect(() => {
    fetchEntities();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">MyCookBook</Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <List>
          <ListItem button onClick={handleMenuClick}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={handleMenuClick}>
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItem>
        </List>
      </Drawer>
      <div>
        {entities.map((entity) => (
          <div key={entity.id}>
            <h2>{entity.name}</h2>
            <p>{entity.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
