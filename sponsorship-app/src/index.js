
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the app.
root.render(
  <Provider store={store}>
        <App />
    </Provider>,
);
