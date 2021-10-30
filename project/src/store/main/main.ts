import {MainState} from '../../types/state';
import { CITIES } from '../../const';
import { createReducer } from '@reduxjs/toolkit';
import { changeCity } from '../action';

const INITIAL_CITY = CITIES[0];

const initialState: MainState = {
  city: INITIAL_CITY,
};

const main = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    });
});

export {main};
