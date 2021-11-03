import { MainState } from '../../types/state';
import { CITIES } from '../../const';
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_CITY = CITIES[0];

const initialState: MainState = {
  city: INITIAL_CITY,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
  },
});

export const { changeCity } = mainSlice.actions;
export default mainSlice.reducer;
