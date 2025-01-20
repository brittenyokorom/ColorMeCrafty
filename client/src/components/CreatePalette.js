import React, { useState } from 'react';
import HexSearch from './HexSearch';
import '../styles/CreatePalette.css';

function CreatePalette() {
  const [title, setTitle] = useState('');
  const [colors, setColors] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const addColorToPalette = (hex, name, brandName) => {
    setColors([...colors, { hex, name, brandName }]);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/palettes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, colors })
      });

      if (!response.ok) {
        throw new Error('Failed to save palette');
      }

      setTitle('');
      setColors([]);
      setError('');
    } catch (error) {
      setError('An error occurred while saving the palette.');
    }
  };

  return (
    <div className="create-palette-container h-screen flex flex-col items-center justify-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Create a Palette</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Palette Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {colors.map((color, index) => (
              <div key={index} className="relative w-20 h-20 rounded-lg shadow-lg flex items-center justify-center" style={{ backgroundColor: color.hex }}>
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
                <div className="absolute bottom-0 left-0 bg-white bg-opacity-75 text-xs p-1 rounded w-full text-center">
                  <p className="font-bold">{color.name}</p>
                  <p>{color.brandName}</p>
                </div>
              </div>
            ))}
          </div>
          <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create Palette
          </button>
        </form>
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">Search Yarn Colorways</h2>
        <HexSearch setResults={setResults} setError={setError} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="results-container mt-4">
          {results.map((result, index) => (
            <div key={index} className="result-card mb-2 p-4 rounded-lg shadow-lg" style={{ backgroundColor: result.hex }}>
              <p className="text-white font-bold">{result.name}</p>
              <p className="text-white">{result.hex}</p>
              <p className="text-white">{result.brandName}</p>
              <p className="text-white">{result.percentMatch}% Match</p>
              <button
                type="button"
                onClick={() => addColorToPalette(result.hex, result.name, result.brandName)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline mt-2"
              >
                Add to Palette
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreatePalette;