import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="bg-pink-500 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/profile" className="text-white no-underline">Profile</Link></li>
        <li><Link to="/create-palette" className="text-white no-underline">Create a Palette</Link></li>
        <li><button onClick={onLogout} className="text-white no-underline">Logout</button></li>
      </ul>
    </nav>
  );
}

export default Navbar;