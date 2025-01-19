import React, { useState } from 'react';
import axios from 'axios';

function HexSearch({ setResults, setError, addColorToPalette }) {
  const [query, setQuery] = useState('');
  const [results, setLocalResults] = useState([]);
  const COLORWAYS_API_KEY = process.env.REACT_APP_COLORWAYS_API_KEY;

  const isValidHex = (hex) => {
    const regex = /^#?([0-9A-F]{3}){1,2}$/i;
    return regex.test(hex);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log('Search query:', query);
    if (!isValidHex(query)) {
      setError('Invalid hex code format. Please use the format #RRGGBB or #RGB.');
      setResults([]);
      setLocalResults([]);
      return;
    }
    const formattedQuery = query.replace('#', '');
    console.log('Formatted query:', formattedQuery);
    try {
      const response = await axios.get(`https://yarn-colorways.p.rapidapi.com/v1/match/${formattedQuery}`, {
        headers: {
          'X-RapidAPI-Key': COLORWAYS_API_KEY,
          'X-RapidAPI-Host': 'yarn-colorways.p.rapidapi.com/v1'
        }
      });
      console.log('API response:', response);
      const extractedResults = response.data.data.map(item => ({
        name: item.name,
        hex: item.hex,
        brandName: item.brandName,
        href: item.href,
        yarnBrand: item.yarnBrand,
        percentMatch: item.percentMatch
      }));
      console.log('Extracted results:', extractedResults);
      const sortedResults = extractedResults.sort((a, b) => b.percentMatch - a.percentMatch);
      setResults(sortedResults);
      setLocalResults(sortedResults);
      setError('');
    } catch (err) {
      console.error('API error:', err);
      setError('An error occurred while fetching data.');
      setResults([]);
      setLocalResults([]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="query">
            Hex Code
          </label>
          <input
            type="text"
            id="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="#RRGGBB or #RGB"
            required
          />
        </div>
        <button type="submit" className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Search
        </button>
      </form>
      <div className="mt-6 max-h-96 overflow-y-auto">
        {results.length > 0 && (
          <div className="grid grid-cols-1 gap-4">
            {results.map((result, index) => (
              <div key={index} className="p-4 rounded-lg shadow-lg" style={{ backgroundColor: result.hex }}>
                <p className="text-white font-bold">Name: {result.name}</p>
                <p className="text-white">Hex: {result.hex}</p>
                <p className="text-white">Brand: {result.brandName}</p>
                <p className="text-white">Yarn Brand: {result.yarnBrand}</p>
                <p className="text-white">Percent Match: {result.percentMatch}%</p>
                <a href={result.href} className="text-white underline">More Info</a>
                <button
                  type="button"
                  onClick={() => addColorToPalette(result.hex)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default HexSearch;