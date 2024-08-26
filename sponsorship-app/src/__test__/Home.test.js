// src/__tests__/Home.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/Home';

test('renders Home page with banner and navigation', () => {
  render(<Home />);
  expect(screen.getByText(/Welcome to the dashboard/i)).toBeInTheDocument();
  expect(screen.getByText(/Sponsor Payment Summary/i)).toBeInTheDocument();
  expect(screen.getByText(/Match Payment Summary/i)).toBeInTheDocument();
});
