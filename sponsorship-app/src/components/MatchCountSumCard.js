import React from 'react';
import './Card.css'; 
const MatchCountSumCard = ({ summary }) => {

    console.log("MatchCountSumCard summary:", summary);
  if (!summary) {
    console.log("summary is null");
    return null;
  }

  
  const matchCount = summary.matchCount ?? 'N/A';


  return (
    <div className="card">
      <h2>{summary.sponsorName}</h2>
      <p>Industry Type: {summary.industryType}</p>
      <p>Contact Email: {summary.contactEmail}</p>
      <p>Phone: {summary.phone}</p>
      <p>Match Count: {matchCount}</p>
    </div>
  );
};

export default MatchCountSumCard;
