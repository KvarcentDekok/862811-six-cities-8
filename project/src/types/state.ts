import { Offer, City } from './offer';
import { AuthorizationStatus, Sorting } from '../const';
import { AuthInfo } from './auth-info';
import { RootState } from '../store/root-reducer';
import { Review } from './review';

export type MainState = {
  city: City,
  sorting: Sorting
}

export type DataState = {
  allOffers: Offer[],
  isLoading: boolean,
  isCommentSending: boolean,
  offersNearby: Offer[],
  reviews: Review[],
  favoriteOffers: Offer[]
}

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo
}

export type State = RootState;
