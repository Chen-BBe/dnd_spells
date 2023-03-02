import { configureStore } from '@reduxjs/toolkit';
import { dndQueryApi } from './apiSlice';

export const setupStore  = preloadedState => {
  return configureStore({
    // devTools: true,
    reducer: {
      [dndQueryApi.reducerPath]: dndQueryApi.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }).concat(dndQueryApi.middleware),
  })
};