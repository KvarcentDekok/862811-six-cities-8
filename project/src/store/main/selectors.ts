import { State } from '../../types/state';
import { City } from '../../types/offer';
import { NameSpace } from '../root-reducer';
import { Sorting } from '../../const';

export const getCity = (state: State): City => state[NameSpace.Main].city;
export const getSorting = (state: State): Sorting => state[NameSpace.Main].sorting;
