import { Offer, City } from './offer';
import { AuthorizationStatus } from '../const';
import { AuthInfo } from './auth-info';

export type State = {
  city: City,
  offers: Offer[],
  allOffers: Offer[],
  isLoading: boolean,
  authorizationStatus: AuthorizationStatus,
  authInfo: AuthInfo
}
