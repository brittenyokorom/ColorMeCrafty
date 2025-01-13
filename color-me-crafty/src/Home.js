import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';
import './Home.css'; // Ensure this file exists and is correctly located

const useStyles = makeStyles({
  root: {
    backgroundColor: '#FFD1DC', // Pastel pink background
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Noto Sans, sans-serif', // Noto Sans font
  },
  nav: {
    marginBottom: '20px',
  },
  link: {
    color: 'black',
    textDecoration: 'none',
    margin: '0 10px',
  },
});

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.nav}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Color Me Crafty
          </Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h1" component="h1">
          Color Me Crafty
        </Typography>
      </Container>
    </div>
  );
}

export default Home;