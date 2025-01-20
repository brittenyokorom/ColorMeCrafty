import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">ColorMeCrafty</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          {token ? (
            <>
              <Link to="/create-palette" className="text-gray-300 hover:text-white">Create Palette</Link>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/';
                }}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;