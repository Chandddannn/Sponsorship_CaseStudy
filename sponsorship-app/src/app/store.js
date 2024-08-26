import { configureStore } from '@reduxjs/toolkit';
import apiDataReducer from '../features/apiDataSlice';

export const store = configureStore({
  reducer: {
    apiData: apiDataReducer,
  },
});
