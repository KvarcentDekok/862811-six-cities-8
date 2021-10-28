import { ActionType } from '../types/action';
import { Offer, City } from '../types/offer';
import { AuthorizationStatus, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';

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

export const checkAuth = () => ({
  type: ActionType.CheckAuth,
} as const);

export const fetchOffers = () => ({
  type: ActionType.FetchOffers,
} as const);

export const login = ({login: email, password}: AuthData) => ({
  type: ActionType.Login,
  payload: {
    email,
    password,
  },
} as const);
