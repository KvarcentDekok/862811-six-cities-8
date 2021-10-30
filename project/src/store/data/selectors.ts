import { Offer } from '../../types/offer';
import { State } from '../../types/state';
import { NameSpace } from '../root-reducer';

export const getOffers = (state: State): Offer[] => state[NameSpace.Data].offers;
export const getAllOffers = (state: State): Offer[] => state[NameSpace.Data].allOffers;
export const getLoadingFlag = (state: State): boolean => state[NameSpace.Data].isLoading;
