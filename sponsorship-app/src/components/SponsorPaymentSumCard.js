import React from 'react';
import './Card.css';

const SponsorPaymentSumCard = ({ summary }) => {
  if (!summary) {
    console.log("summary is null");
    return null;
  }


  const totalPayments = summary.totalPayments !== undefined ? summary.totalPayments.toFixed(2) : 'N/A';
  const latestPaymentDate = summary.latestPaymentDate ? new Date(summary.latestPaymentDate).toLocaleDateString() : 'N/A';

  return (
    <div className="card">
      <h2>{summary.sponsorName}</h2>
      <p>Industry Type: {summary.industryType}</p>
      <p>Contact Email: {summary.contactEmail}</p>
      <p>Phone: {summary.phone}</p>
      <p>Total Payments: {totalPayments}</p>
      <p>Number of Payments: {summary.numberOfPayments}</p>
      <p>Latest Payment Date: {latestPaymentDate}</p>
    </div>
  );
};

export default SponsorPaymentSumCard;
