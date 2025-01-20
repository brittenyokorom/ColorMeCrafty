import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="home-container h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Welcome to ColorMeCrafty</h1>
        <p className="text-lg mb-6 text-gray-600">Create and share your own color palettes for your crafting projects!</p>
        {token ? (
          <div>
            <Link to="/create-palette" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Create a Palette
            </Link>
          </div>
        ) : (
          <div className="flex justify-center">
            <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;