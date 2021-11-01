import { rootReducer } from '../root-reducer';
import { Middleware } from 'redux';
import { ActionType } from '../../types/action';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, AppRoute } from '../../const';
import { OfferServer } from '../../types/offer';
import { saveToken } from '../../services/token';
import browserHistory from '../../browser-history';
import { requireAuthorization } from '../user/user';
import { loadOffersFulfilled, loadOffersPending, loadOffersRejected } from '../data/data';
import { nanoid } from '@reduxjs/toolkit';

type Reducer = ReturnType<typeof rootReducer>;

enum HttpCode {
  Unauthorized = 401,
}

function createFetchMiddleware(api: AxiosInstance): Middleware<unknown, Reducer> {
  return ({ dispatch, getState }) => (next) => async (action) => {
    if (!action.type.startsWith('API/')) {
      return next(action);
    }

    switch (action.type) {
      case ActionType.CheckAuth:
        api.get(APIRoute.Login)
          .then((response) =>
            dispatch(requireAuthorization(
              AuthorizationStatus.Auth,
              response.data.avatar_url,
              response.data.email,
            )))
          .catch((error) => {
            if (error.response.status === HttpCode.Unauthorized) {
              dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            }
          });

        break;
      case ActionType.FetchOffers:
        dispatch(loadOffersPending(nanoid(), api));

        try {
          const {data} = await api.get<OfferServer[]>(APIRoute.Offers);

          dispatch(loadOffersFulfilled(data, nanoid(), api));
        } catch {
          dispatch(loadOffersRejected(null, nanoid(), api));
        }

        break;
      case ActionType.Login:
        api.post(APIRoute.Login, action.payload)
          .then((response) => {
            saveToken(response.data.token);
            dispatch(requireAuthorization(
              AuthorizationStatus.Auth,
              response.data.avatar_url,
              response.data.email,
            ));
            browserHistory.push(AppRoute.Main);
          });

        break;
      default:
        return next(action);
    }
  };
}

export const fetchMiddleware = createFetchMiddleware;
