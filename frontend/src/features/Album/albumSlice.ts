import { Album, Track } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchAlbum } from './albumThunk.ts';

interface AlbumState {
  data: Album | null;
  tracks: Track[];
  isAlbumLoading: boolean;
  isTracksLoading: boolean;
}

const initialState: AlbumState = {
  data: null,
  tracks: [],
  isAlbumLoading: false,
  isTracksLoading: false,
};

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbum.pending, (state) => {
      state.isAlbumLoading = true;
      state.isTrackLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state, { payload: data }) => {
      if (data) {
        state.data = data.album;
        state.tracks = data.tracks;
      }
      state.isAlbumLoading = false;
      state.isTrackLoading = false;
    });
    builder.addCase(fetchAlbum.rejected, (state) => {
      state.isAlbumLoading = false;
      state.isTrackLoading = false;
    });
  },
});

export const albumReducer = albumSlice.reducer;
export const albumState = (state: RootState) => state.album.data;
export const tracksState = (state: RootState) => state.album.tracks;
export const albumLoading = (state: RootState) => state.album.isAlbumLoading;
export const tracksLoading = (state: RootState) => state.album.isTracksLoading;
