import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackMutation, TrackReduced } from '../../types';
import axiosApi from '../../axiosApi.ts';
import { RootState } from '../../app/store.ts';

export const fetchTracksByAlbum = createAsyncThunk<TrackReduced[], string>(
  'tracks/fetchTracksByAlbum',
  async (arg) => {
    try {
      const response = await axiosApi.get(`/tracks?album=${arg}`);
      return response.data;
    } catch (e) {
      console.log('Caught on try - FETCH TRACKS - ', e);
    }
  },
);
export const submitTrack = createAsyncThunk<null, TrackMutation, {state: RootState}>(
  'tracks/submit',
  async (arg,{getState}) => {
    try {
      const token = getState().users.user?.token

      const response = await axiosApi.post('/tracks/new', arg, {headers:{
          Authorization:'Bearer ' + token
        }});
      return response.data;
    } catch (e) {
      console.log('Caught on try - SUBMIT TRACK - ', e);
    }
  },
);