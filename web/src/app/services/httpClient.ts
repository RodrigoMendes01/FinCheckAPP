import axios from 'axios';
import { AccessTokenKeys } from '../config/AccessTokenKeys';
import { sleep } from '../utils/sleep';

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

httpClient.interceptors.request.use(config => {
  const accessToken = localStorage.getItem(AccessTokenKeys.ACCESS_TOKEN);

  if(accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

httpClient.interceptors.response.use(async data => {
  await sleep();

  return data;
});

export default httpClient;
