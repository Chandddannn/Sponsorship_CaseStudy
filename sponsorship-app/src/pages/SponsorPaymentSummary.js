import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSponsorPaymentSummaries } from '../features/apiDataSlice';
import SponsorPaymentSumCard from '../components/SponsorPaymentSumCard';
import './SponsorPaymentSummary.css'; 
import Header from '../components/Header';


const SponsorPaymentSummary = () => {
    const dispatch = useDispatch();
    const sponsorPaymentSummaries = useSelector((state) => state.apiData.sponsorPaymentSummaries);
    const status = useSelector((state) => state.apiData.status);
  
    useEffect(() => {
      dispatch(fetchSponsorPaymentSummaries());
    }, [dispatch]);
  
    if (status === 'loading') {
      return <div>Loading...</div>;
    }
  
    if (status === 'failed') {
      return <div>Error fetching data</div>;
    }
  
    console.log('Sponsor Payment Summaries:', sponsorPaymentSummaries); // Debug line
  
    return (
        <>
        <Header/>
        <div className="sponsor-payment-summary-container">
          <h1>Sponsor Payment Summary</h1>
          {sponsorPaymentSummaries.length === 0 ? (
            <p>No data available</p>
          ) : (
            <div className="card-container">
              {sponsorPaymentSummaries.map((summary) => (
                <SponsorPaymentSumCard key={summary.sponsorId} summary={summary} />
              ))}
            </div>
          )}
        </div>
        </>
      );
      
  };
  
  export default SponsorPaymentSummary;


