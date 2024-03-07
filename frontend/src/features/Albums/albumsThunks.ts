import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchAlbumsByArtist = createAsyncThunk<
  Album[] | undefined,
  string
>('albums/fetchByArtist', async (arg) => {
  try {
    const response = await axiosApi.get(`/albums?artist=${arg}`);
    return response.data;
  } catch (e) {
    console.log('Caught on try - FETCH ALBUMS - ', e);
  }
});

export const fetchSingleAlbum = createAsyncThunk<Album, string>(
  'albums/fetchSingleAlbum',
  async(arg)=>{
    try {
      const response = await axiosApi.get(`/albums/${arg}`)
      return response.data
    }catch (e) {
      console.log('Caught on try - FETCH ALBUM - ', e);
    }
  }
)



