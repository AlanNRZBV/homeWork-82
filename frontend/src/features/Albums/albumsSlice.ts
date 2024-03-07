import { Album, AlbumAndTrackData } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchAlbumsByArtist, fetchExtendedAlbum } from './albumsThunks.ts';

interface AlbumState {
  albums: Album[];
  albumExtended: AlbumAndTrackData
  isLoading: boolean;
  isExtendedAlbumLoading: boolean
}

const initialState: AlbumState = {
  albums:[],
  albumExtended:{
    album:{
      _id:'',
      releaseDate:'',
      title:'',
      cover:'',
      artistId:''
    },
    tracks:[]
  },
  isLoading: false,
  isExtendedAlbumLoading:false
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
    builder.addCase(fetchExtendedAlbum.pending, (state) => {
      state.isExtendedAlbumLoading = true;
    });
    builder.addCase(fetchExtendedAlbum.fulfilled, (state, { payload: extended}) => {
      state.isExtendedAlbumLoading = false;
      if(extended){
        state.albumExtended = extended
      }
    });
    builder.addCase(fetchExtendedAlbum.rejected, (state) => {
      state.isExtendedAlbumLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const albumsState = (state: RootState) => state.albums.albums;
export const albumExtendedState = (state: RootState) => state.albums.albumExtended;
export const isAlbumsLoading = (state: RootState) => state.albums.isLoading;
export const isExtendedAlbumsLoading = (state: RootState) => state.albums.isExtendedAlbumLoading;
