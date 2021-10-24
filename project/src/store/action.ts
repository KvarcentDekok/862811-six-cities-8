import { ActionType } from '../types/action';
import { Offer, City } from '../types/offer';

export const changeCity = (city: City) => ({
  type: ActionType.ChangeCity,
  payload: city,
} as const);

export const fillOffers = (offers: Offer[]) => ({
  type: ActionType.FillOffers,
  payload: offers,
} as const);
