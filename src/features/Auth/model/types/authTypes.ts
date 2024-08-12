export type AuthMode = 'signIn' | 'signUp';

export interface AuthSchema {
  isAuth: boolean;
  isLoading: boolean;
  error: string;
}
