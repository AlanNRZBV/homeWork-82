import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchAlbumsByArtist, fetchSingleAlbum, submitAlbum } from './albumsThunks.ts';

interface AlbumState {
  albums: Album[];
  singleAlbum: Album;
  isLoading: boolean;
  isSingleAlbumLoading: boolean;
  isSingleAlbumSubmitting: boolean
}

const initialState: AlbumState = {
  albums:[],
  singleAlbum:{
    _id:'',
    releaseDate:'',
    title:'',
    cover:'',
    artistId:'',
    isPublished:false
  },
  isLoading: false,
  isSingleAlbumLoading:false,
  isSingleAlbumSubmitting: false
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
    builder.addCase(fetchSingleAlbum.pending, (state) => {
      state.isSingleAlbumLoading = true;
    });
    builder.addCase(fetchSingleAlbum.fulfilled, (state, { payload: album}) => {
      state.isSingleAlbumLoading = false;
      state.singleAlbum = album
    });
    builder.addCase(fetchSingleAlbum.rejected, (state) => {
      state.isSingleAlbumLoading = false;
    });
    builder.addCase(submitAlbum.pending, (state)=>{
      state.isSingleAlbumSubmitting = true
    })
    builder.addCase(submitAlbum.fulfilled, (state)=>{
      state.isSingleAlbumSubmitting = false
    })
    builder.addCase(submitAlbum.rejected, (state)=>{
      state.isSingleAlbumSubmitting = false
    })

  },
});

export const albumsReducer = albumsSlice.reducer;
export const albumsState = (state: RootState) => state.albums.albums;
export const albumState = (state: RootState) => state.albums.singleAlbum;
export const isAlbumsLoading = (state: RootState) => state.albums.isLoading;
export const isAlbumLoading = (state: RootState) => state.albums.isSingleAlbumLoading;
export const isAlbumSubmitting = (state: RootState) => state.albums.isSingleAlbumSubmitting;
