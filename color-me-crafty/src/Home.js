import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Ensure this file exists and is correctly located

function Home() {
  return (
    <div className="bg-pink-200 h-screen flex flex-col items-center justify-center font-sans">
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