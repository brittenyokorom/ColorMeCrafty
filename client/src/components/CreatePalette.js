import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import HexSearch from './HexSearch';
import Filter from './Filter';
import '../styles/CreatePalette.css';

function CreatePalette() {
  const [title, setTitle] = useState('');
  const [colors, setColors] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    // Fetch the list of brands from the API
    const fetchBrands = async () => {
      try {
        const response = await fetch('https://yarn-colorways.p.rapidapi.com/v1/brands', {
          method: 'GET',
          headers: {
            'X-RapidAPI-Host': 'yarn-colorways.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.REACT_APP_COLORWAYS_API_KEY
          }
        });
        const data = await response.json();
        console.log('Fetched brands:', data); // Log the fetched data
        setBrands(data.data);
      } catch (error) {
        console.error('Error fetching brands:', error); // Log any errors
        setError('Failed to fetch brands');
      }
    };

    fetchBrands();
  }, []); // Empty dependency array ensures this runs only once

  const addColorToPalette = (hex, name, brandName) => {
    if (colors.some(color => color.hex === hex)) {
      setError('Color already in palette');
      return;
    }
    setColors([...colors, { hex, name, brandName, locked: false }]);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const toggleLockColor = (index) => {
    setColors(colors.map((color, i) => i === index ? { ...color, locked: !color.locked } : color));
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

      setTitle(title);
      setColors(colors);
      setError(error);
    } catch (error) {
      setError('An error occurred while saving the palette.');
    }
  };

  const getTextColor = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? 'black' : 'white';
  };

  const filteredResults = selectedBrands.length
    ? results.filter(result => selectedBrands.includes(result.brandId))
    : results;

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
              <div key={index} className="palette-card" style={{ backgroundColor: color.hex }}>
                <div className="options-section">
                  <button
                    type="button"
                    onClick={() => toggleLockColor(index)}
                    className="lock-button"
                  >
                    <FontAwesomeIcon icon={color.locked ? faLock : faUnlock} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeColor(index)}
                    className="remove-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
                <div className="divider"></div>
                <div className="text-center text-xs mt-auto" style={{ color: getTextColor(color.hex) }}>
                  <p className="font-bold truncate" style={{ color: getTextColor(color.hex) }}>{color.name}</p>
                  <p className="truncate">{color.brandName}</p>
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
        <Filter brands={brands} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands} />
        {error && <p className="text-red-500 mt-4">{error}</p>}
        <div className="results-container mt-4">
          {filteredResults.map((result, index) => (
            <div key={index} className="result-card mb-2 p-4 rounded-lg shadow-lg" style={{ backgroundColor: result.hex }}>
              <p className="text-white font-bold truncate">{result.name}</p>
              <p className="text-white truncate">{result.hex}</p>
              <p className="text-white truncate">{result.brandName}</p>
              <p className="text-white truncate">{result.percentageMatch}% Match</p>
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