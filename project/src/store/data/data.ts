import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {DataState} from '../../types/state';
import { OfferServer } from '../../types/offer';
import { APIRoute } from '../../const';
import { adaptToClientOffers, api } from '../../services/api';

const loadOffers = createAsyncThunk(
  'data/loadOffers',
  async () => {
    const {data} = await api.get<OfferServer[]>(APIRoute.Offers);
    return data;
  },
);

const loadOffersNearby = createAsyncThunk(
  'data/loadOffersNearby',
  async (offerId: string) => {
    const {data} = await api.get<OfferServer[]>(APIRoute.OffersNearby.replace(':hotel_id', offerId));
    return data;
  },
);

const initialState: DataState = {
  allOffers: [],
  isLoading: true,
  offersNearby: [],
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
      })
      .addCase(loadOffersNearby.fulfilled, (state, action) => {
        state.offersNearby = adaptToClientOffers(action.payload);
      });
  },
});

export {loadOffers, loadOffersNearby};
export default dataSlice.reducer;
