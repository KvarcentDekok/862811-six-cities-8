import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  changeCity,
  fillOffers,
  requireAuthorization,
  loadOffersPending,
  loadOffersFulfilled,
  loadOffersRejected,
  redirectToRoute
} from '../store/action';

import { State } from './state';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillOffers = 'main/fillOffers',
  GetOffers = 'main/getOffers',
  LoadOffersPending = 'data/loadOffers/pending',
  LoadOffersFulfilled = 'data/loadOffers/fulfilled',
  LoadOffersRejected = 'data/loadOffers/rejected',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute'
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffers>
  | ReturnType<typeof loadOffersPending>
  | ReturnType<typeof loadOffersFulfilled>
  | ReturnType<typeof loadOffersRejected>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
