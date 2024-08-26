import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
  sponsorPaymentSummaries: [],
  matchPaymentSummaries: [],
  sponsorMatchCounts: [],
  loading: false,
  error: null,
};


export const fetchSponsorPaymentSummaries = createAsyncThunk(
  'apiData/fetchSponsorPaymentSummaries',
  async () => {
    const response = await axios.get('http://localhost:5285/api/Sponsorship/sponsor-payment-summary');
    return response.data;
  }
);


export const fetchMatchPaymentSummaries = createAsyncThunk(
  'apiData/fetchMatchPaymentSummaries',
  async () => {
    const response = await axios.get('http://localhost:5285/api/Sponsorship/match-payment-summary');
    return response.data;
  }
);

export const fetchSponsorMatchCounts = createAsyncThunk(
  'apiData/fetchSponsorMatchCounts',
  async (year) => {
    const response = await axios.get('http://localhost:5285/api/Sponsorship/match-counts', { params: { year } });
    return response.data;
  }
);


export const addPayment = createAsyncThunk(
  'apiData/addPayment',
  async (payment) => {
    const response = await axios.post('http://localhost:5285/api/Sponsorship/add-payment', payment);
    return response.data;
  }
);

const apiDataSlice = createSlice({
  name: 'apiData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      
      .addCase(fetchSponsorPaymentSummaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSponsorPaymentSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsorPaymentSummaries = action.payload;
      })
      .addCase(fetchSponsorPaymentSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(fetchMatchPaymentSummaries.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMatchPaymentSummaries.fulfilled, (state, action) => {
        state.loading = false;
        state.matchPaymentSummaries = action.payload;
      })
      .addCase(fetchMatchPaymentSummaries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
      .addCase(fetchSponsorMatchCounts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSponsorMatchCounts.fulfilled, (state, action) => {
        state.loading = false;
        state.sponsorMatchCounts = action.payload;
      })
      .addCase(fetchSponsorMatchCounts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      .addCase(addPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.loading = false;
        
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default apiDataSlice.reducer;
