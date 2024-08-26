
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import SponsorPaymentSummary from './pages/SponsorPaymentSummary';
import MatchPaymentSummary from './pages/MatchPaymentSummary';
import MatchCountSummary from './pages/MatchCountSummary';
import AddPaymentForm from './pages/AddPaymentForm';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import './App.css';

const AuthRedirect = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = localStorage.getItem('auth');
    if (!auth) {
      navigate('/login');
    }
  }, [navigate]);

  return null; 
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<AuthRedirect />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/add-payment" element={<ProtectedRoute element={<AddPaymentForm />} />} />
        <Route path="/sponsor-payment-summary" element={<ProtectedRoute element={<SponsorPaymentSummary />} />} />
        <Route path="/match-payment-summary" element={<ProtectedRoute element={<MatchPaymentSummary />} />} />
        <Route path="/match-count-summary" element={<ProtectedRoute element={<MatchCountSummary />} />} />
      </Routes>
    </Router>
  );
};

export default App;
