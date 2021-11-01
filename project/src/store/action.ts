import { ActionType } from '../types/action';
import { AuthData } from '../types/auth-data';
import { createAction } from '@reduxjs/toolkit';

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
