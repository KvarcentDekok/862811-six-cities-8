import reducer from '../reducer';
import { Middleware } from 'redux';
import { ActionType } from '../../types/action';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, AppRoute } from '../../const';
import { requireAuthorization, loadOffersPending, loadOffersRejected, loadOffersFulfilled, redirectToRoute } from '../action';
import { OfferServer } from '../../types/offer';
import { adaptToClientOffers } from '../../services/api';
import { saveToken } from '../../services/token';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

enum HttpCode {
  Unauthorized = 401,
}

function createFetchMiddleware(api: AxiosInstance): Middleware<unknown, Reducer> {
  return ({ dispatch }) => (next) => async (action) => {
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
          .catch((e) => {
            if (e.status === HttpCode.Unauthorized) {
              dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
            }
          });

        break;
      case ActionType.FetchOffers:
        {
          let data;

          dispatch(loadOffersPending());

          try {
            data = (await api.get<OfferServer[]>(APIRoute.Offers)).data;
          } catch {
            dispatch(loadOffersRejected());
          }

          if (data) {
            dispatch(loadOffersFulfilled(adaptToClientOffers(data)));
          }
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
            dispatch(redirectToRoute(AppRoute.Main));
          });

        break;
      case ActionType.RedirectToRoute:
        browserHistory.push(action.payload);
        break;
      default:
        return next(action);
    }
  };
}

export const fetchMiddleware = createFetchMiddleware;
