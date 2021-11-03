import { Offer, City } from './offer';
import { AuthorizationStatus } from '../const';
import { AuthInfo } from './auth-info';
import { RootState } from '../store/root-reducer';

export type MainState = {
  city: City
}

export type DataState = {
  offers: Offer[],
  allOffers: Offer[],
  isLoading: boolean
}

export type UserState = {
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo
}

export type State = RootState;
