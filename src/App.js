import React, { useEffect, useState } from 'react';
import CandidateForm from './components/CandidateForm';
import CandidateList from './components/CandidateList';
import CandidateSearch from './components/CandidateSearch';
import Visualization from './components/Visualization';
import { getAllCandidates, addCandidate } from './services/api';
import './App.css';
import Chart from './components/Chart';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { Button } from '@mui/material';
const App = () => {
  const [candidates, setCandidates] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getAllCandidates();
  //     setCandidates(data.data);
  //   };
  //   fetchData();
  // }, []);


  const handleSearch = (query) => {
    // Implement search logic here and update state accordingly
  };

  return (
    <div className="App">
     
      <h1>Candidate Database</h1>

      {/* <CandidateForm />
      <CandidateSearch onSearch={handleSearch} />
      <CandidateList candidates={candidates} />
      <Visualization candidates={candidates} />
      <Chart /> */}
      <Router>
        {/* <Header /> */}
        <Routes >
          <Route path='/' exact element={<Home />} />
          <Route path="/Chart" element={<Chart />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
