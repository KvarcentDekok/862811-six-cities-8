import { MainState } from '../../types/state';
import { CITIES, Sorting } from '../../const';
import { createSlice } from '@reduxjs/toolkit';

const INITIAL_CITY = CITIES[0];

const initialState: MainState = {
  city: INITIAL_CITY,
  sorting: Sorting.Popular,
};

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.city = action.payload;
    },
    changeSorting: (state, action) => {
      state.sorting = action.payload;
    },
  },
});

export const { changeCity, changeSorting } = mainSlice.actions;
export default mainSlice.reducer;
