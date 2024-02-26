import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackHistory } from '../../types';
import axiosApi from '../../axiosApi.ts';

export const fetchTrackHistory = createAsyncThunk<TrackHistory[] | undefined, string>(
  'trackHistory/fetch',
  async (arg) => {
    try{




      const response = await axiosApi.get<TrackHistory>('/track_history',{
        headers:{
          Authorization: `Bearer ${arg}`
        }
      })
      return [response.data]
    }catch (e) {
      console.log('Caught on try - FETCH TRACK HISTORY -', e)
    }
  },
);
