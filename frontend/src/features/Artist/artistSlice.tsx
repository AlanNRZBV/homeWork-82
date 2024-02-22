import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { fetchArtist } from './artistThunk.ts';

interface ArtistState {
  data:Album[],
  isLoading: boolean,
  isLoaded: boolean
}

const initialState: ArtistState = {
  data: [],
  isLoading:false,
  isLoaded: false
}

export const artistSlice= createSlice({
  name:'artist',
  initialState,
  reducers:{},
  extraReducers:builder => {
    builder.addCase(fetchArtist.pending, (state)=>{
      state.isLoading = true
    });
    builder.addCase(fetchArtist.fulfilled, (state,{payload: albums})=>{
      state.data = albums
      state.isLoading = false
    });
    builder.addCase(fetchArtist.rejected, (state)=>{
      state.isLoading = false
    });
  }
})

export const artistReducer = artistSlice.reducer;
export const artistState = (state: RootState)=> state.artist.data;
export const artistLoading = (state: RootState)=> state.artist.isLoading