import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSponsorMatchCounts } from '../features/apiDataSlice';
import MatchCountSumCard from '../components/MatchCountSumCard';
import Header from '../components/Header';
import './MatchCountSummary.css';

const MatchCountSummary = () => {
  const [year, setYear] = useState("");
  const dispatch = useDispatch();
  const matchCounts = useSelector((state) => state.apiData.sponsorMatchCounts);
  const status = useSelector((state) => state.apiData.status);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (year) {
      dispatch(fetchSponsorMatchCounts(year));
    }
  };


  useEffect(() => {
    if (year) {
      dispatch(fetchSponsorMatchCounts(year));
    }
  }, [year, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching data</div>;
  }
  console.log('Match Counts:', matchCounts);


  return (
    <>
    <Header/>
    <div className="match-count-summary-container">
      <h1>Match Count Summary</h1>
      <form  onSubmit={handleSubmit} className="input-container">
        <input 
          type="text" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          placeholder="Enter Year"
        />
        <button type='submit' >Fetch</button>
      </form>
      {status === 'loading' ? (
        <div>Loading...</div>
      ) : status === 'failed' ? (
        <div>Error fetching data</div>
      ) : matchCounts.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="card-container">
          {matchCounts.map((summary) => (
            <MatchCountSumCard key={summary.sponsorId} summary={summary} />
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default MatchCountSummary;
