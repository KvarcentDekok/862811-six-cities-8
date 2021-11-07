import { createSelector } from 'reselect';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';
import { getCity } from '../main/selectors';

export const getAllOffers = (state: State): Offer[] => state[NameSpace.Data].allOffers;
export const getOffersByCity = createSelector(
  [getAllOffers, getCity],
  (offers, city) => offers.filter((offer: Offer) => offer.city.name === city.name),
);
export const getLoadingFlag = (state: State): boolean => state[NameSpace.Data].isLoading;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Data].offersNearby;
