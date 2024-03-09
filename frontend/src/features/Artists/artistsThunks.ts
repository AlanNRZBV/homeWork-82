import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artist, ArtistMutation } from '../../types';
import { RootState } from '../../app/store.ts';

export const fetchArtists = createAsyncThunk<Artist[] | undefined>(
  'artists/fetch',
  async () => {
    try {
      const response = await axiosApi.get<Artist[]>('/artists');
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH ARTISTS - ', e);
    }
  },
);
export const submitArtist = createAsyncThunk<null, ArtistMutation, {state: RootState}>(
  'artists/submit',
  async (arg,{getState}) => {
    try {
      const token = getState().users.user?.token
      const formData = new FormData();
      const keys = Object.keys(arg) as (keyof ArtistMutation)[];
      keys.forEach((key) => {
        const value = arg[key];
        if (value !== null) {
          formData.append(key, value);
        }
      });
      const response = await axiosApi.post('/artists/new', formData, {headers:{
          Authorization:'Bearer ' + token
        }});
      return response.data;
    } catch (e) {
      console.log('Caught on try - SUBMIT ARTIST - ', e);
    }
  },
);