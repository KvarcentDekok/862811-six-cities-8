import { ActionType, ThunkActionResult } from '../types/action';
import { Offer, City } from '../types/offer';
import { AuthorizationStatus, APIRoute } from '../const';

export const changeCity = (city: City) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const fillOffers = (offers: Offer[]) => ({
  type: ActionType.FillOffers,
  payload: offers,
} as const);

export const loadOffersPending = () => ({
  type: ActionType.LoadOffersPending,
} as const);

export const loadOffersFulfilled = (offers: Offer[]) => ({
  type: ActionType.LoadOffersFulfilled,
  payload: {
    offers,
  },
} as const);

export const loadOffersRejected = () => ({
  type: ActionType.LoadOffersRejected,
} as const);

export const requireAuthorization = (authStatus: AuthorizationStatus) => ({
  type: ActionType.RequireAuthorization,
  payload: authStatus,
} as const);

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    let data;

    dispatch(loadOffersPending());

    try {
      data = await (await api.get<Offer[]>(APIRoute.Offers)).data;
    } catch {
      dispatch(loadOffersRejected());
    }

    if (data) {
      dispatch(loadOffersFulfilled(data));
    }
  };
