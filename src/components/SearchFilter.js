import React from 'react';
import './SearchFilter.css';

const SearchFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="search-filter">
      <div className="filter-group">
        <input
          type="text"
          placeholder="🔍 Search by name or breed..."
          className="search-input"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
        />
      </div>

      <div className="filter-buttons">
        <button
          className={`filter-btn ${filters.type === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('type', 'all')}
        >
          All Pets
        </button>
        <button
          className={`filter-btn ${filters.type === 'dog' ? 'active' : ''}`}
          onClick={() => onFilterChange('type', 'dog')}
        >
          🐕 Dogs
        </button>
        <button
          className={`filter-btn ${filters.type === 'cat' ? 'active' : ''}`}
          onClick={() => onFilterChange('type', 'cat')}
        >
          🐈 Cats
        </button>
      </div>

      <div className="filter-group">
        <label className="filter-label">Age Range:</label>
        <select
          className="filter-select"
          value={filters.age}
          onChange={(e) => onFilterChange('age', e.target.value)}
        >
          <option value="all">All Ages</option>
          <option value="puppy">Puppy/Kitten (0-1 year)</option>
          <option value="young">Young (1-3 years)</option>
          <option value="adult">Adult (3-7 years)</option>
          <option value="senior">Senior (7+ years)</option>
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">Gender:</label>
        <select
          className="filter-select"
          value={filters.gender}
          onChange={(e) => onFilterChange('gender', e.target.value)}
        >
          <option value="all">All</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>
    </div>
  );
};

export default SearchFilter;