import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchAlbumsByArtist } from './albumsThunks.ts';

interface AlbumState {
  albums: Album[];
  isLoading: boolean;
}

const initialState: AlbumState = {
  albums:[],
  isLoading: false
};

export const albumsSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAlbumsByArtist.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAlbumsByArtist.fulfilled, (state, { payload: albums }) => {
      state.isLoading = false;
      if(albums){
        state.albums = albums
      }
    });
    builder.addCase(fetchAlbumsByArtist.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const albumsState = (state: RootState) => state.albums.albums;
export const isAlbumsLoading = (state: RootState) => state.albums.isLoading;
