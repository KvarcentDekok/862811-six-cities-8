import reducer from '../reducer';
import { Middleware } from 'redux';
import { ActionType } from '../../types/action';
import { AxiosInstance } from 'axios';
import { APIRoute, AuthorizationStatus, AppRoute } from '../../const';
import { requireAuthorization, loadOffersPending, loadOffersRejected, loadOffersFulfilled } from '../action';
import { OfferServer } from '../../types/offer';
import { adaptToClientOffers } from '../../services/api';
import { saveToken } from '../../services/token';
import browserHistory from '../../browser-history';

type Reducer = ReturnType<typeof reducer>;

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
            )));

        break;
      case ActionType.FetchOffers:
        dispatch(loadOffersPending());

        try {
          const {data} = await api.get<OfferServer[]>(APIRoute.Offers);

          dispatch(loadOffersFulfilled(adaptToClientOffers(data)));
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
