import React, { useState } from 'react';
import axios from 'axios';
import HexSearch from './HexSearch';

function CreatePalette() {
  const [title, setTitle] = useState('');
  const [colors, setColors] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const addColorToPalette = (hex) => {
    if (colors.length < 8) {
      setColors([...colors, hex]);
    } else {
      setError('Palette can only contain up to 8 colors.');
    }
  };

  const removeColor = (index) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Palette created:', { title, colors });
    try {
      const token = localStorage.getItem('token');
      await axios.post('/api/palettes', { title, colors }, {
        headers: {
          Authorization: token
        }
      });
      setTitle('');
      setColors([]);
      setError('');
      alert('Palette saved successfully');
    } catch (err) {
      console.error('Error saving palette:', err);
      setError('An error occurred while saving the palette.');
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pink-200">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create a Palette</h1>
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
              <div key={index} className="relative w-16 h-16 rounded-lg shadow-lg" style={{ backgroundColor: color }}>
                <button
                  type="button"
                  onClick={() => removeColor(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Create Palette
          </button>
        </form>
        <h2 className="text-xl font-bold mt-8 mb-4 text-center">Search Yarn Colorways</h2>
        <HexSearch setResults={setResults} setError={setError} addColorToPalette={addColorToPalette} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default CreatePalette;