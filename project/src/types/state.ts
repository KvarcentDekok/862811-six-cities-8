import { Offer, City } from './offer';
import { AuthorizationStatus, Sorting } from '../const';
import { AuthInfo } from './auth-info';
import { RootState } from '../store/root-reducer';

export type MainState = {
  city: City,
  sorting: Sorting
}

export type DataState = {
  allOffers: Offer[],
  isLoading: boolean,
  offersNearby: Offer[]
}

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo
}

export type State = RootState;
