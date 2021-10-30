import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { State } from './state';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillOffers = 'data/fillOffers',
  LoadOffersPending = 'data/loadOffers/pending',
  LoadOffersFulfilled = 'data/loadOffers/fulfilled',
  LoadOffersRejected = 'data/loadOffers/rejected',
  RequireAuthorization = 'user/requireAuthorization',
  CheckAuth = 'API/checkAuth',
  FetchOffers = 'API/fetchOffers',
  Login = 'API/login'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
