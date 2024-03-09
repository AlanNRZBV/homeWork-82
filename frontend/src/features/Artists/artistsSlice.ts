import { Artist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchArtists, submitArtist } from './artistsThunks.ts';

interface ArtistsState {
  artists: Artist[];
  isLoading: boolean;
  isUploading: boolean;
}

const initialState: ArtistsState = {
  artists: [],
  isLoading: false,
  isUploading: false,
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
    builder.addCase(submitArtist.pending, (state) => {
      state.isUploading = true;
    });
    builder.addCase(submitArtist.fulfilled, (state) => {
      state.isUploading = false;
    });
    builder.addCase(submitArtist.rejected, (state) => {
      state.isUploading = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const artistsState = (state: RootState) => state.artists.artists;
export const isArtistsLoading = (state: RootState) => state.artists.isLoading;
export const isArtistsUploading = (state: RootState) => state.artists.isLoading;
