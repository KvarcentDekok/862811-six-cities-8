import {UserState} from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { createReducer } from '@reduxjs/toolkit';
import { requireAuthorization } from '../action';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      const {authStatus, avatarUrl, userEmail} = action.payload;

      state.authorizationStatus = authStatus;
      state.authInfo = avatarUrl && userEmail ? {
        avatarUrl: avatarUrl,
        email: userEmail,
      } : null;
    });
});

export {user};
