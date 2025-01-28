import React from 'react';
import '../styles/Filter.css';

function Filter({ brands, selectedBrands, setSelectedBrands }) {
  const handleBrandChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    console.log('Selected brands:', value); // Log the selected brands
    setSelectedBrands(value);
  };

  return (
    <div className="filter-container">
      <label className="filter-label" htmlFor="brand">
        Filter by Brand
      </label>
      <select
        id="brand"
        multiple
        value={selectedBrands}
        onChange={handleBrandChange}
        className="filter-select"
      >
        {brands.map((brand, index) => (
          <option key={index} value={brand.brandId}>
            {brand.brandName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filter;