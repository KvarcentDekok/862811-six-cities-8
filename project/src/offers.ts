import { Offer, City } from './types/offer';

export function getOffersByCity(city: City, offers: Offer[]): Offer[] {
  return offers.filter((offer: Offer) => offer.city.name === city.name);
}
