import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/Artists/artistsSlice.ts';
import { artistReducer } from '../features/Artist/artistSlice.ts';
import { albumReducer } from '../features/Album/albumSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    artist: artistReducer,
    album: albumReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
