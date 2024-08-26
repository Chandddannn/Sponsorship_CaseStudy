import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPayment } from '../features/apiDataSlice';
import "./AddPaymentForm.css";
import Header from '../components/Header';

const AddPaymentForm = () => {
  const [paymentDate, setPaymentDate] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [contractId, setContractId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentDate || amountPaid <= 0 || !contractId || !['Pending', 'Completed', 'Failed'].includes(paymentStatus)) {
      setError('Please fill in all fields correctly.');
      setSuccessMessage('');
      return;
    }
    try {
      await dispatch(addPayment({ payment_date: paymentDate, amount_paid: amountPaid, contract_id: contractId, payment_status: paymentStatus }));
      setPaymentDate('');
      setAmountPaid('');
      setContractId('');
      setPaymentStatus('Pending');
      setError('');
      setSuccessMessage('Payment has been successfully added.');
    } catch (err) {
      setError('Failed to add payment.');
      setSuccessMessage('');
    }
  };

  return (
    <>
      <Header/>
    <div className="add-payment-form">
      <h1>Add Payment</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
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
        <button type="submit">Add Payment</button>
      </form>
    </div>
    </>
  );
};

export default AddPaymentForm;
