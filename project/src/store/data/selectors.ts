import { createSelector } from 'reselect';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';
import { getCity, getSorting } from '../main/selectors';
import { sortOffers } from '../../utils/utils';
import { Review } from '../../types/review';

export const getAllOffers = (state: State): Offer[] => state[NameSpace.Data].allOffers;
export const getOffersByCity = createSelector(
  [getAllOffers, getCity, getSorting],
  (offers, city, currentSorting) => {
    const offersByCity = offers.filter((offer: Offer) => offer.city.name === city.name);

    return sortOffers(offersByCity, currentSorting);
  },
);
export const getLoadingFlag = (state: State): boolean => state[NameSpace.Data].isLoading;
export const getCommentSendingFlag = (state: State): boolean => state[NameSpace.Data].isCommentSending;
export const getOffersNearby = (state: State): Offer[] => state[NameSpace.Data].offersNearby;
export const getReviews = (state: State): Review[] => state[NameSpace.Data].reviews;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
