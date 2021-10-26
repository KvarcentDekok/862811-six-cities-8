import { ActionType, ThunkActionResult } from '../types/action';
import { Offer, City, OfferServer } from '../types/offer';
import { AuthorizationStatus, APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { Token, saveToken } from '../services/token';
import { adaptToClientOffers } from '../services/api';

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

export const requireAuthorization = (authStatus: AuthorizationStatus, avatarUrl?: string, userEmail?: string) => ({
  type: ActionType.RequireAuthorization,
  payload: {
    authStatus,
    avatarUrl,
    userEmail,
  },
} as const);

export const redirectToRoute = (url: AppRoute) => ({
  type: ActionType.RedirectToRoute,
  payload: url,
} as const);

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    let data;

    dispatch(loadOffersPending());

    try {
      data = await (await api.get<OfferServer[]>(APIRoute.Offers)).data;
    } catch {
      dispatch(loadOffersRejected());
    }

    if (data) {
      dispatch(loadOffersFulfilled(adaptToClientOffers(data)));
    }
  };

export const checkAuthAction = (): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {avatar_url: avatarUrl, email: userEmail}} = await api.get<{'avatar_url': string, email: string}>(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth, avatarUrl, userEmail));
  };

export const loginAction = ({login: email, password}: AuthData): ThunkActionResult =>
  async (dispatch, _getState, api) => {
    const {data: {token, avatar_url: avatarUrl, email: userEmail}} = await api.post<{token: Token, 'avatar_url': string, email: string}>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuthorization(AuthorizationStatus.Auth, avatarUrl, userEmail));
    dispatch(redirectToRoute(AppRoute.Main));
  };
