import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { getOffersByCity } from '../offers';
import { CITIES } from '../const';

const INITIAL_CITY = CITIES[0];

const initialState = {
  city: INITIAL_CITY,
  offers: getOffersByCity(INITIAL_CITY),
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffers: {
      return {...state, offers: action.payload};
    }
    default:
      return state;
  }
};

export {reducer};
