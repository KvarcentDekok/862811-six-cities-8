import user from './user';
import { AuthorizationStatus } from '../../const';

describe('Reducer: user', () => {
  it('without additional parameters should return initial state', () => {
    expect(user(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        authInfo: null,
      });
  });
});
