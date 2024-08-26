
import React, { useState } from 'react';

const PaymentForm = ({ onSubmit }) => {
  const [paymentDate, setPaymentDate] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [contractId, setContractId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ paymentDate, amountPaid, contractId, paymentStatus });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Payment Date:</label>
        <input type="date" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
      </div>
      <div>
        <label>Amount Paid:</label>
        <input type="number" value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)} />
      </div>
      <div>
        <label>Contract ID:</label>
        <input type="number" value={contractId} onChange={(e) => setContractId(e.target.value)} />
      </div>
      <div>
        <label>Payment Status:</label>
        <select value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Failed">Failed</option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PaymentForm;
