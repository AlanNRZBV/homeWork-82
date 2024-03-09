import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album, AlbumMutation } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

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
  async (arg) => {
    try {
      const response = await axiosApi.get(`/albums/${arg}`);
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH ALBUM - ', e);
    }
  },
);

export const submitAlbum = createAsyncThunk<null, AlbumMutation, {state: RootState}>(
  'albums/submit',
  async (arg,{getState}) => {
    try {
      const token = getState().users.user?.token
      const formData = new FormData();
      const keys = Object.keys(arg) as (keyof AlbumMutation)[];
      keys.forEach((key) => {
        const value = arg[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      const response = await axiosApi.post('/albums/new', formData, {headers:{
        Authorization:'Bearer ' + token
        }});
      return response.data;
    } catch (e) {
      console.log('Caught on try - SUBMIT ALBUM - ', e);
    }
  },
);
