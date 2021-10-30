import { createReducer } from '@reduxjs/toolkit';
import {DataState} from '../../types/state';
import { fillOffers, loadOffersPending, loadOffersFulfilled, loadOffersRejected } from '../action';

const initialState: DataState = {
  offers: [],
  allOffers: [],
  isLoading: true,
};

const data = createReducer(initialState, (builder) => {
  builder
    .addCase(fillOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(loadOffersPending, (state) => {
      state.isLoading = true;
    })
    .addCase(loadOffersFulfilled, (state, action) => {
      const {offers} = action.payload;

      state.allOffers = offers;
      state.isLoading = false;
    })
    .addCase(loadOffersRejected, (state) => {
      state.isLoading = false;
    });
});

export {data};
