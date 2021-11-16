import { State } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { NameSpace } from '../root-reducer';
import { AuthInfo } from '../../types/auth-info';

export const getLoggedInFlag = (state: State): boolean => state[NameSpace.User].authorizationStatus === AuthorizationStatus.Auth;
export const getAuthInfo = (state: State): AuthInfo => state[NameSpace.User].authInfo;
