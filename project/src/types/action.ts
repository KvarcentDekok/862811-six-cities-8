import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';

import { State } from './state';

export enum ActionType {
  CheckAuth = 'API/checkAuth',
  Login = 'API/login'
}

export type ThunkActionResult<R = Promise<void>> = ThunkAction<R, State, AxiosInstance, Action>;
export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
