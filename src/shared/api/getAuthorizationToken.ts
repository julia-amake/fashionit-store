import { LOCAL_STORAGE_TOKEN_KEY } from '../consts/localStorage';

export const getAuthorizationToken = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  return token ? `Bearer ${token}` : '';
};
