import {configureStore} from "@reduxjs/toolkit";
import { artistsReducer } from '../features/Artists/artistsSlice.ts';
import { artistReducer } from '../features/Artist/artistSlice.tsx';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    artist: artistReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
