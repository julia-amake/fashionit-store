import axios from 'axios';
import { API_URL } from '../consts/api';
import { getAuthorizationToken } from './getAuthorizationToken';

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: getAuthorizationToken(),
  },
});
