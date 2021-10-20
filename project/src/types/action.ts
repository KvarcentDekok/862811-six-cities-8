import { changeCity, fillOffers } from '../store/action';

export enum ActionType {
  ChangeCity = 'main/changeCity',
  FillOffers = 'main/fillOffers',
  GetOffers = 'main/getOffers'
}

export type Actions =
  | ReturnType<typeof changeCity>
  | ReturnType<typeof fillOffers>
