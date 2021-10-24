import { Offer, City } from './types/offer';
import { adaptToClientOffers } from './api';
import { offers } from './mocks/offers';

export function getOffersByCity(city: City): Offer[] {
  return adaptToClientOffers(offers).filter((offer) => offer.city.name === city.name);
}
