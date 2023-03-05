import {
  configureStore,
  ThunkAction,
  Action,
  StateFromReducersMapObject,
  PreloadedState,
} from '@reduxjs/toolkit';

import moduleProgressReducer from './slices/moduleProgress';
import overallProgressReducer from './slices/overallProgress';
import inputReducer from './slices/input';

const reducer = {
  moduleProgress: moduleProgressReducer,
  overallProgress: overallProgressReducer,
  input: inputReducer,
};

export type RootState = StateFromReducersMapObject<typeof reducer>;

export function makeStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer,
    preloadedState,
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;

export default store;
