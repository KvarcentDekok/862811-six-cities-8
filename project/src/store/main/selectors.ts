import { State } from '../../types/state';
import { City } from '../../types/offer';
import { NameSpace } from '../root-reducer';

export const getCity = (state: State): City => state[NameSpace.Main].city;
