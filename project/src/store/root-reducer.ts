import { combineReducers } from '@reduxjs/toolkit';
import data from './data/data';
import main from './main/main';
import user from './user/user';


export enum NameSpace {
  Main = 'MAIN',
  Data = 'DATA',
  User = 'USER',
}

export const rootReducer = combineReducers({
  [NameSpace.Main]: main,
  [NameSpace.Data]: data,
  [NameSpace.User]: user,
});

export type RootState = ReturnType<typeof rootReducer>;
