import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchArtists } from './artistsThunks.ts';

interface ArtistsState {
  artists: Artist[];
  isLoading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  isLoading: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArtists.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
      if (artists && artists.length > 0) {
        state.artists = artists;
      }
      state.isLoading = false;
    });
    builder.addCase(fetchArtists.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const artistsState = (state: RootState) => state.artists.artists;
export const artistsLoading = (state: RootState) => state.artists.isLoading;
