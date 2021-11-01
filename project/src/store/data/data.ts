import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {DataState} from '../../types/state';
import { OfferServer } from '../../types/offer';
import { APIRoute } from '../../const';
import { AxiosInstance } from 'axios';
import { adaptToClientOffers } from '../../services/api';

const loadOffers = createAsyncThunk(
  'data/loadOffers',
  async (api: AxiosInstance) => {
    const {data} = await api.get<OfferServer[]>(APIRoute.Offers);
    return data;
  },
);

const initialState: DataState = {
  offers: [],
  allOffers: [],
  isLoading: true,
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadOffers.fulfilled, (state, action) => {
        state.allOffers = adaptToClientOffers(action.payload);
        state.isLoading = false;
      })
      .addCase(loadOffers.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const {pending: loadOffersPending, fulfilled: loadOffersFulfilled, rejected: loadOffersRejected} = loadOffers;
export default dataSlice.reducer;
