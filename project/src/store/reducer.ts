import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { CITIES } from '../const';
import { getOffersByCity } from '../offers';

const INITIAL_CITY = CITIES[0];

const initialState = {
  city: INITIAL_CITY,
  offers: [],
  allOffers: [],
  isDataLoaded: false,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffers: {
      return {...state, offers: action.payload};
    }
    case ActionType.LoadOffers: {
      const {offers} = action.payload;
      return {
        ...state,
        offers: state.offers.length ? state.offers : getOffersByCity(state.city, offers),
        allOffers: offers,
        isDataLoaded: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;
