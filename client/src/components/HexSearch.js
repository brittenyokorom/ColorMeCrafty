import React, { useState } from 'react';
import axios from 'axios';
import '../styles/HexSearch.css';

const COLORWAYS_API_KEY = process.env.REACT_APP_COLORWAYS_API_KEY;

function HexSearch({ setResults }) {
  const [query, setQuery] = useState('#ff69b4'); // Initial color set to pink
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formattedQuery = query.replace('#', ''); // Remove the '#' for the API request
    try {
      const response = await axios.get(`https://yarn-colorways.p.rapidapi.com/v1/match/${formattedQuery}`, {
        headers: {
          'X-RapidAPI-Key': COLORWAYS_API_KEY,
          'X-RapidAPI-Host': 'yarn-colorways.p.rapidapi.com/v1'
        }
      });
      const data = response.data.data;
      const extractedResults = data.map(item => ({
        hex: item.hex,
        name: item.name,
        yarnName: item.yarnName,
        percentageMatch: item.percentMatch,
        brandName: item.brandName
      }));
      // Sort results by highest percentage match
      extractedResults.sort((a, b) => b.percentageMatch - a.percentageMatch);
      setResults(extractedResults);
      setError('');
    } catch (error) {
      setError('An error occurred while searching for colors.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hex-search-container mt-4">
      <form onSubmit={handleSearch} className="flex items-center justify-center space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="color"
            id="hs-color-input"
            className="color-picker-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            title="Choose your color"
            style={{ backgroundColor: query, height: '2.5rem', width: '5rem' }} 
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default HexSearch;
