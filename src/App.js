import React, { createContext, useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Divider, Drawer, IconButton, Button, Box, Container, Stack } from '@mui/material';
import { ChevronLeft, Menu } from '@mui/icons-material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShowRecipes from './recipe/ShowRecipes';
import MyAllergens from './allergens/MyAllergens';
import { useLogin } from './login_logic';

export const UserContext = createContext(null);

const App = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [user, login, logout] = useLogin();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (<div className="home-background">
    <Container>
      <UserContext.Provider value={{ user, login, logout }}>
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
            {user ?
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
              </Toolbar> : <></>}
            <Stack direction="row" alignItems="center" spacing={1} sx={{ alignItems: 'center' }}>
              
                <div style={{ display: 'flex', justifyContent: 'flex-end', textDecoration: 'none', color: '#E01E9B', paddingRight: '30 px' }}>
                  {user ? (
                    <Button
                      color="inherit"
                      sx={{ marginRight: '0.5vw', padding: '0px', fontSize: '14px' }}
                      onClick={logout}
                    >
                      Log out
                    </Button>
                  ) : (
                    <div style={{ display: 'flex', textDecoration: 'none', color: '#E01E9B', paddingRight: '30 px' }}>
                      <Button
                        color="inherit"
                        sx={{ marginRight: '0.5vw', padding: '0px', fontSize: '14px' }}
                        onClick={() => navigate('/login')}
                      >
                        Log in
                      </Button>
                      <Button
                        color="inherit"
                        sx={{ padding: '0px', fontSize: '14px' }}
                        onClick={() => navigate('/signin')}
                      >
                        Sign in
                      </Button>
                    </div>
                  )}
                </div>


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
                onClick={() => { navigate('/recipe'); setOpen(false) }}
              >
                All recipes
              </Button>
              {user && user.role === "ROLE_REGULAR_USER" ? (
                <>

                  <Button
                    activeClassName="activeLink"
                    className="navLink"
                    style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px' }}
                    onClick={() => { navigate('/myCookbook'); setOpen(false) }}
                  >
                    My cookbook
                  </Button>
                  <Button
                    activeClassName="activeLink"
                    className="navLink"
                    style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
                    onClick={() => { navigate('/myAllergens'); setOpen(false) }}
                  >
                    My allergens
                  </Button>
                </>
              ) : <></>}
              {user && user.role === "ROLE_ADMIN" ? (
                <>
                  <Button
                    activeClassName="activeLink"
                    className="navLink"
                    style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
                    onClick={() => { navigate('/allAllergens'); setOpen(false) }}
                  >
                    All allergens
                  </Button>


                  <Button
                    activeClassName="activeLink"
                    className="navLink"
                    style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px' }}
                    onClick={() => { navigate('/chef'); setOpen(false) }}
                  >
                    Chefs
                  </Button>
                  <Button
                    activeClassName="activeLink"
                    className="navLink"
                    style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px' }}
                    onClick={() => { navigate('/regularuser'); setOpen(false) }}
                  >
                    Regular users
                  </Button>
                  <Button
                    activeClassName="activeLink"
                    className="navLink"
                    style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
                    onClick={() => { navigate('/ingredients'); setOpen(false) }}
                  >
                    Ingredients
                  </Button>
                </>) : <></>}
              {user && user.role === "ROLE_CHEF" ? (<>
                <Button
                  activeClassName="activeLink"
                  className="navLink"
                  style={{ textDecoration: 'none', color: '#E01E9B', fontSize: '14px', marginTop: '8px' }}
                  onClick={() => { navigate('/chefRecipes'); setOpen(false) }}
                >
                  Chef recipes
                </Button></>) : <></>}
            </Stack>
          </Drawer>
        </Stack>
        <Box sx={{ paddingTop: '150px' }}>
          <Outlet />
        </Box>
      </UserContext.Provider>
    </Container>
    </div>  );
};

export default App;
