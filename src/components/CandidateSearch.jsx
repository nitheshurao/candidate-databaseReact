import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const CandidateSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="search"
        label="Search Candidates"
        value={query}
        onChange={handleChange}
        fullWidth
      />
      <Button type="submit" variant="contained" color="primary">
        Search
      </Button>
    </form>
  );
};

export default CandidateSearch;
