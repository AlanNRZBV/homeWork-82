import axios from 'axios';
import { apiURL } from './constants';
import { RootState } from './app/store.ts';
import { Store } from '@reduxjs/toolkit';

const axiosApi = axios.create({
  baseURL: apiURL,
});
export const addInterceptors = (store:Store<RootState>)=>{
  const token = store.getState().users.user?.token;
  console.log('inside interceptor ', token)
  axiosApi.interceptors.request.use((config)=>{
    config.headers.set("Authorization", token ? 'Bearer ' + token : undefined);
    return config
  });
};
export default axiosApi;
