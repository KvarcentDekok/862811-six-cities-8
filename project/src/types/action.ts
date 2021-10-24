import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import {
  changeCity,
  fillOffers,
  requireAuthorization,
  requireLogout,
  redirectToRoute,
  loadOffers
} from '../store/action';

import { State } from './state';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillOffers = 'main/fillOffers',
  GetOffers = 'main/getOffers',
  LoadOffers = 'data/loadOffers',
  RequireAuthorization = 'user/requireAuthorization',
  RequireLogout = 'user/requireLogout',
  RedirectToRoute = 'main/redirectToRoute'
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffers>
  | ReturnType<typeof loadOffers>
  | ReturnType<typeof requireAuthorization>
  | ReturnType<typeof requireLogout>
  | ReturnType<typeof redirectToRoute>;

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Actions>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Actions>;
