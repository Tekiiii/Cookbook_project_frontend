import React, { createContext, useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Divider, Drawer, IconButton, Button, Box, Container, Stack } from '@mui/material';
import { ChevronLeft, Menu } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowRecipes from './recipe/ShowRecipes';
import MyAllergens from './allergens/MyAllergens';
import { get_login } from './login_logic';
import Login from './Login';

export const UserContext = createContext(null);

const App = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [userData, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(get_login());
  })

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleUserLogin = () => {
    return;
    // isUserLoggedIn ? logOut() : // TODO: open login modal;
  }

  const logOut = () => {
    // TODO: add api for logout
  }



  return (
    <Container>
      <Stack>
        <AppBar className='appBar'
          position="fixed"
          sx={{
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
                borderRadius: '100%',
              }}
            >
              <Menu sx={{
                width: '24px',
                height: '24px'
              }} />
            </IconButton>
          </Toolbar>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ alignItems: 'center' }}>
            {/* TODO: add button with user name(if logged in) and account icon inside which will open dropdown*/}
            {/* dropdown will contain following options:
              if logged in otions are: ['user profile, log out']
              if logged out option are: ['login, sign in']
            */}
            Button
              <IconButton color="inherit">
                <AccountCircleIcon />
              </IconButton>
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