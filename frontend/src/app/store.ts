import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/Artists/artistsSlice.ts';
import { artistReducer } from '../features/Artist/artistSlice.ts';
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
import { tracksHistoryReducer } from '../features/Tracks/tracksHistorySlice.ts';
import { albumsReducer } from '../features/Albums/albumsSlice.ts';

const usersPersistConfig = {
  key: 'spotify:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  artist: artistReducer,
  albums: albumsReducer,
  tracksHistory: tracksHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
