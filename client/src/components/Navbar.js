import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">ColorMeCrafty</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
            <Link to="/create-palette" className="text-gray-300 hover:text-white">Create Palette</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;