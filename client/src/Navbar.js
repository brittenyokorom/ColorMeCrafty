import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-pink-500 p-4">
      <ul className="flex space-x-4">
        <li><Link to="/" className="text-white no-underline">Home</Link></li>
        <li><Link to="/profile" className="text-white no-underline">Profile</Link></li>
        <li><Link to="/logout" className="text-white no-underline">Logout</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;