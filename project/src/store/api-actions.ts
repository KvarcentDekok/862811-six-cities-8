import { ThunkActionResult } from '../types/action';
import { OfferServer } from '../types/offer';
import { APIRoute } from '../const';
import { loadOffers } from './action';
import { adaptToClientOffers } from '../services/api';

export const fetchOffersAction = (): ThunkActionResult =>
  async (dispatch, _getState, api): Promise<void> => {
    const {data} = await api.get<OfferServer[]>(APIRoute.Offers);
    dispatch(loadOffers(adaptToClientOffers(data)));
  };
