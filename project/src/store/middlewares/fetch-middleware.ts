import { rootReducer } from '../root-reducer';
import { Middleware } from 'redux';
import { ActionType } from '../../types/action';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, AppRoute } from '../../const';
import { requireAuthorization, loadOffersPending, loadOffersRejected, loadOffersFulfilled, fillOffers } from '../action';
import { OfferServer } from '../../types/offer';
import { adaptToClientOffers } from '../../services/api';
import { saveToken } from '../../services/token';
import browserHistory from '../../browser-history';
import { getOffersByCity } from '../../offers';

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
        dispatch(loadOffersPending());

        try {
          const {data} = await api.get<OfferServer[]>(APIRoute.Offers);

          dispatch(loadOffersFulfilled(adaptToClientOffers(data)));

          if (!getState().DATA.offers.length) {
            dispatch(fillOffers(getOffersByCity(getState().MAIN.city, adaptToClientOffers(data))));
          }
        } catch {
          dispatch(loadOffersRejected());
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
