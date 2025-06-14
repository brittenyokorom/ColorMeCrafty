import React, { useState } from 'react';
import colors from '../data/colors.json';

function HexSearch({ setResults, setError }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);

    // Remove '#' if present and make lowercase for comparison
    const formattedQuery = query.replace('#', '').toLowerCase();

    // Flatten all colorways from all yarns
    const allColorways = colors.data.flatMap(yarn =>
      (yarn.colorwaysData || []).map(colorway => ({
        ...colorway,
        yarnName: yarn.yarnName,
        brandName: yarn.brandName,
        yarnId: yarn.yarnId,
        brandId: yarn.brandId
      }))
    );

    // Filter by hex code or color name
    const filtered = allColorways.filter(colorway =>
      colorway.hex?.replace('#', '').toLowerCase() === formattedQuery ||
      colorway.name?.toLowerCase().includes(formattedQuery)
    );

    if (filtered.length > 0) {
      setResults(filtered);
      setError('');
    } else {
      setResults([]);
      setError('No matching colors found.');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSearch} className="mb-4">
      <input
        type="text"
        placeholder="Search by hex code or color name"
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="shadow border rounded py-2 px-3 mr-2"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default HexSearch;
