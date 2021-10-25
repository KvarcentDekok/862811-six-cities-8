import { Offer, City } from './offer';

export type State = {
  city: City,
  offers: Offer[],
  allOffers: Offer[],
  isLoading: boolean
}