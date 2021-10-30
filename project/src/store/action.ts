import { ActionType } from '../types/action';
import { Offer, City } from '../types/offer';
import { AuthorizationStatus } from '../const';
import { AuthData } from '../types/auth-data';
import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<City>(ActionType.ChangeCity);
export const fillOffers = createAction<Offer[]>(ActionType.FillOffers);
export const loadOffersPending = createAction(ActionType.LoadOffersPending);

export const loadOffersFulfilled = createAction(
  ActionType.LoadOffersFulfilled,
  (offers: Offer[]) => ({
    payload: {
      offers,
    },
  }),
);

export const loadOffersRejected = createAction(ActionType.LoadOffersRejected);

export const requireAuthorization = createAction(
  ActionType.RequireAuthorization,
  (authStatus: AuthorizationStatus, avatarUrl?: string, userEmail?: string) => ({
    payload: {
      authStatus,
      avatarUrl,
      userEmail,
    },
  }),
);

export const checkAuth = createAction(ActionType.CheckAuth);
export const fetchOffers = createAction(ActionType.FetchOffers);

export const login = createAction(
  ActionType.Login,
  ({login: email, password}: AuthData) => ({
    payload: {
      email,
      password,
    },
  }),
);
