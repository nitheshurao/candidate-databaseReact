import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateSearch = ({ onSearchResults }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (e) => {
    // e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:5000/candidates?search=${searchQuery}`);
      onSearchResults(response.data.candidates);
    } catch (error) {
      console.error('Error searching candidates:', error);
    }
  };
useEffect(()=>{
    handleSearch()
},[searchQuery])
  return (
    <div className="candidate-search">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search candidates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default CandidateSearch;
