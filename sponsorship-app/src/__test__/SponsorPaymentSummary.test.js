// src/__tests__/SponsorPaymentSummary.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import SponsorPaymentSummary from '../pages/SponsorPaymentSummary';

test('renders Sponsor Payment Summary page', () => {
  render(
    <Provider store={store}>
      <SponsorPaymentSummary />
    </Provider>
  );
  expect(screen.getByText(/Sponsor Payment Summary/i)).toBeInTheDocument();
});
