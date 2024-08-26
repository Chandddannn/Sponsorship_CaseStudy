import React from 'react';
import './Card.css';

const MatchPaymentSumCard = ({ summary }) => {
  if (!summary) {
    console.log("summary is null");
    return null;
  }

  const totalPayments = summary.totalPayments !== undefined ? summary.totalPayments.toFixed(2) : 'N/A';
  const matchDate = summary.matchDate ? new Date(summary.matchDate).toLocaleDateString() : 'N/A';

  return (
    <div className="card">
      <h2>{summary.matchName}</h2>
      <p>Match Date: {matchDate}</p>
      <p>Location: {summary.location}</p>
      <p>Total Payments: {totalPayments}</p>
    </div>
  );
};

export default MatchPaymentSumCard;
