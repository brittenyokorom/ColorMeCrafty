import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import HexSearch from './HexSearch';
import Filter from './Filter';
import colors from '../data/colors.json';
import '../styles/CreatePalette.css';

console.log('Imported Colors:', colors);

function CreatePalette() {
  const [title, setTitle] = useState('');
  const [colorsState, setColors] = useState([]);
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');
  const [brands] = useState(colors.data); 
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const addColorToPalette = (hex, name, brandName) => {
    if (colorsState.some(color => color.hex === hex)) {
      setError('Color already in palette');
      return;
    }
    setColors([...colorsState, { hex, name, brandName, locked: false }]);
  };

  const removeColor = (index) => {
    setColors(colorsState.filter((_, i) => i !== index));
  };

  const toggleLockColor = (index) => {
    setColors(colorsState.map((color, i) => i === index ? { ...color, locked: !color.locked } : color));
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
        body: JSON.stringify({ title, colors: colorsState })
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
            {colorsState.map((color, index) => (
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
          <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
          onCleck={() => setShowModal(true)}>
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
      {showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-4">Your Palette</h2>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {colorsState.map((color, index) => (
          <a
            key={index}
            href={`https://yarn-colorways.p.rapidapi.com/v1/yarns/${color.yarnId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-2 rounded"
            style={{ backgroundColor: color.hex, textDecoration: 'none' }}
          >
            <div className="text-xs font-bold" style={{ color: "#fff" }}>{color.brandName}</div>
            <div className="text-xs" style={{ color: "#fff" }}>{color.name}</div>
          </a>
        ))}
      </div>
      <button
        className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowModal(false)}
      >
        Close
      </button>
    </div>
  </div>
)}
    </div>
  );
}

export default CreatePalette;