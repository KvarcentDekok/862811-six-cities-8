import { UserState } from '../../types/state';
import { AuthorizationStatus, APIRoute } from '../../const';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { saveToken, dropToken } from '../../services/token';
import { api } from '../../services/api';
import { AuthData } from '../../types/auth-data';

const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async () => {
    const {data} = await api.get(APIRoute.Login);
    return data;
  },
);

const login = createAsyncThunk(
  'user/login',
  async (authData: AuthData) => {
    const {data} = await api.post(APIRoute.Login, authData);
    return data;
  },
);

const logout = createAsyncThunk(
  'user/logout',
  async () => {
    const {data} = await api.delete(APIRoute.Logout);
    return data;
  },
);

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  authInfo: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        const {avatar_url: avatarUrl, email} = action.payload;

        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = {
          avatarUrl,
          email,
        };
      })
      .addCase(checkAuth.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authInfo = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const {token, avatar_url: avatarUrl, email} = action.payload;

        saveToken(token);
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.authInfo = {
          avatarUrl,
          email,
        };
      })
      .addCase(logout.fulfilled, (state) => {
        dropToken();
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.authInfo = null;
      });
  },
});

export {checkAuth, login, logout};
export default userSlice.reducer;
