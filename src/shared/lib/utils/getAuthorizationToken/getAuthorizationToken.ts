import { LOCAL_STORAGE_TOKEN_KEY } from 'src/shared/consts/localStorage';

export const getAuthorizationToken = () =>
  `Bearer ${localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY) || ''}`;
