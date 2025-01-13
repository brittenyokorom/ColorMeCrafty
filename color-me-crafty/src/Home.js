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
      <nav className="mb-5">
        <ul className="flex space-x-4">
          <li><Link to="/" className="text-black no-underline">Home</Link></li>
          <li><Link to="/login" className="text-black no-underline">Login</Link></li>
          <li><Link to="/profile" className="text-black no-underline">Profile</Link></li>
        </ul>
      </nav>
      <h1 className="text-4xl">Color Me Crafty</h1>
    </div>
  );
}

export default Home;