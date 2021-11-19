import user, { checkAuth, login, logout } from './user';
import { AuthorizationStatus } from '../../const';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: null,
      });
  });

  it('should fill auth info and change authorization status to "Auth"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: null,
    };

    const avatarUrl = '/some/path';
    const email = 'q@w.e';

    expect(user(state, checkAuth.fulfilled({'avatar_url': avatarUrl, email}, ' ')))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: {avatarUrl, email},
      });

    expect(user(state, login.fulfilled({'avatar_url': avatarUrl, email}, ' ', {email, password: '123456q'})))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Auth,
        authInfo: {avatarUrl, email},
      });
  });

  it('should clear auth info and change authorization status to "NoAuth"', () => {
    const state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      authInfo: {avatarUrl: '/some/path', email: 'q@w.e'},
    };

    expect(user(state, checkAuth.rejected(null, ' ')))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: null,
      });

    expect(user(state, logout.fulfilled(null, ' ')))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NoAuth,
        authInfo: null,
      });
  });
});
