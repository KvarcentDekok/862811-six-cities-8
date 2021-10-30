import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../root-reducer';
import { AuthInfo } from '../../types/auth-info';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getAuthInfo = (state: State): AuthInfo => state[NameSpace.User].authInfo;
