import { UserState } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Payload = {
  authStatus: AuthorizationStatus,
  avatarUrl?: string,
  userEmail?: string
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    requireAuthorization: {
      reducer: (state, action: PayloadAction<Payload>) => {
        const {authStatus, avatarUrl, userEmail} = action.payload;

        state.authorizationStatus = authStatus;
        state.authInfo = avatarUrl && userEmail ? {
          avatarUrl: avatarUrl,
          email: userEmail,
        } : null;
      },
      prepare: (authStatus: AuthorizationStatus, avatarUrl?: string, userEmail?: string) => ({
        payload: {
          authStatus,
          avatarUrl,
          userEmail,
        },
      }),
    },
  },
});

export const { requireAuthorization } = userSlice.actions;
export default userSlice.reducer;
