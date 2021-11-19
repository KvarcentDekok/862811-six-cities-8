import { createSelector } from 'reselect';
import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';
import { getCity, getSorting } from '../main/selectors';
import { sortOffers, sortReviews } from '../../utils/utils';
import { Review } from '../../types/review';

const MAX_REVIEWS_NUMBER = 10;

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
export const getReviews = (state: State): Review[] => sortReviews(state[NameSpace.Data].reviews.slice()).slice(0, MAX_REVIEWS_NUMBER);
export const getReviewsNumber = (state: State): number => state[NameSpace.Data].reviews.length;
export const getFavoriteOffers = (state: State): Offer[] => state[NameSpace.Data].favoriteOffers;
