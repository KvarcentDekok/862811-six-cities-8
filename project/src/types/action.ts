import { Action } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { ThunkDispatch } from 'redux-thunk';

import { State } from './state';

export type ThunkAppDispatch = ThunkDispatch<State, AxiosInstance, Action>;
