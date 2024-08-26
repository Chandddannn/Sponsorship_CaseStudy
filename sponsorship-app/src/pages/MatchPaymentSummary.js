import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMatchPaymentSummaries } from '../features/apiDataSlice';
import MatchPaymentSumCard from '../components/MatchPaymentSumCard';
import Header from '../components/Header';
import './MatchPaymentSummary.css'; 

const MatchPaymentSummary = () => {
  const dispatch = useDispatch();
  const matchPaymentSummaries = useSelector((state) => state.apiData.matchPaymentSummaries);
  const status = useSelector((state) => state.apiData.status);

  useEffect(() => {
    dispatch(fetchMatchPaymentSummaries());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error fetching data</div>;
  }

  console.log('Match Payment Summaries:', matchPaymentSummaries);

  return (
    <>
    <Header/>
    <div className="match-payment-summary-container">
      <h1>Match Payment Summary</h1>
      {matchPaymentSummaries.length === 0 ? (
        <p>No data available</p>
      ) : (
        <div className="card-container">
          {matchPaymentSummaries.map((summary) => (
            <MatchPaymentSumCard key={summary.matchId} summary={summary} />
          ))}
        </div>
      )}
    </div>
    </>
  );
  
};

export default MatchPaymentSummary;
