import { State } from '../types/state';
import { Actions, ActionType } from '../types/action';
import { CITIES, AuthorizationStatus } from '../const';
import { getOffersByCity } from '../offers';

const INITIAL_CITY = CITIES[0];

const initialState = {
  city: INITIAL_CITY,
  offers: [],
  allOffers: [],
  isLoading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
};

const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case ActionType.ChangeCity:
      return {...state, city: action.payload};
    case ActionType.FillOffers: {
      return {...state, offers: action.payload};
    }
    case ActionType.LoadOffersPending: {
      return {...state, isLoading: true};
    }
    case ActionType.LoadOffersFulfilled: {
      const {offers} = action.payload;
      return {
        ...state,
        offers: state.offers.length ? state.offers : getOffersByCity(state.city, offers),
        allOffers: offers,
        isLoading: false,
      };
    }
    case ActionType.LoadOffersRejected: {
      return {...state, isLoading: false};
    }
    case ActionType.RequireAuthorization:
      return {
        ...state,
        authorizationStatus: action.payload.authStatus,
        authInfo: action.payload.avatarUrl && action.payload.userEmail ? {
          avatarUrl: action.payload.avatarUrl,
          email: action.payload.userEmail,
        }: null,
      };
    default:
      return state;
  }
};

export default reducer;
