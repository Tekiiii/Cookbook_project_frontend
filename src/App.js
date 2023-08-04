import React, { createContext, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Divider, Drawer, IconButton, Button, Box, Container, Stack } from '@mui/material';
import { ChevronLeft, Menu } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowRecipes from './recipe/ShowRecipes';
import MyAllergens from './allergens/MyAllergens';

export const UserContext = createContext(null);

const App = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Container>
      <Stack>
        <AppBar className='appBar'
          position="fixed"
          sx={{
            marginTop: "10px",
            display: "flex",
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: "rgba(255,255,255,0.44)",
            backdropFilter: "blur(20px)",
          }}
        >
          <Toolbar>
            <IconButton
              onClick={handleDrawerOpen}
              sx={{
                color: '#E01E9B',
                marginLeft: '2vw',
              }}
            >
              <Menu sx={{
                width: '4vh',
                height: '4vw'
              }} />
            </IconButton>
          </Toolbar>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ alignItems: 'center' }}>
            <NavLink
              to="/login"
              activeClassName="activeLink"
              className="navLink"
              style={{ textDecoration: 'none', color: '#E01E9B', marginRight: '15px' }}
            >

              (
              <Button color="inherit" sx={{ marginRight: '0.5vw', padding: "0px", fontSize: '14px' }} >
                Log out
              </Button>
              )
              (
              <Button color="inherit" sx={{ marginRight: '0.5vw', padding: "0px", fontSize: '14px' }} onClick={() => navigate('/login')}>
                Log in
              </Button>
              )
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </NavLink>
          </Stack>
        </AppBar>
        


        <Drawer className='drawer'
          anchor="left"
          open={open}
          onClose={handleDrawerClose}
          sx={{
            width: '150px',
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: '250px',
              boxSizing: 'border-box',
              right: '15px',
            },
          }}
        >
          <Box>
            <IconButton>
              <ChevronLeft sx={{ color: '#E01E9B' }} onClick={handleDrawerClose} />
            </IconButton>
          </Box>
          <Divider sx={{ backgroundColor: '#E01E9B' }} />
          <Stack direction="column" alignItems="flex-start" marginTop={2} marginLeft={5}>
            <Button
              activeClassName="activeLink"
              className="navLink"
              style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px' }}
              onClick={() => {navigate('/myCookbook'); setOpen(false)}}
            >
              My cookbook
            </Button>
            <Button
              activeClassName="activeLink"
              className="navLink"
              style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
            onClick={() => {navigate('/myAllergens'); setOpen(false)}}
            >
              My allergens
            </Button>
            {/* {user && user.role !== "ROLE_CHEF" ?  */}
            <Button
              activeClassName="activeLink"
              className="navLink"
              style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
            //onClick={() => {navigate('/chefRecipes'); setOpen(false)}}
            >
              Chef recipes
            </Button>
          </Stack>
        </Drawer>
      </Stack>
      <Box sx={{ paddingTop: '150px' }}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default App;