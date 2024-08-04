import axios from 'axios';
import { API_URL } from 'src/shared/consts/api';
import { getAuthorizationToken } from 'src/shared/lib/utils';

export const $api = axios.create({
  baseURL: API_URL,
  headers: {
    authorization: getAuthorizationToken(),
  },
});
