import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/Artists/artistsSlice.ts';
import { usersReducer } from '../features/Users/usersSlice.ts';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { tracksHistoryReducer } from '../features/TracksHistory/tracksHistorySlice.ts';
import { albumsReducer } from '../features/Albums/albumsSlice.ts';
import { tracksReducer } from '../features/Tracks/tracksSlice.ts';

const usersPersistConfig = {
  key: 'spotify:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
