import { SessionResponse } from 'src/entities/Session';
import { rtkApi } from 'src/shared/api/rtkApi';
import { COMMAND_ID } from 'src/shared/consts/api';
import { transformErrorResponse } from 'src/shared/lib/utils/transformErrorResponse';
import { AuthFormValues } from '../ui/AuthForm/AuthForm';

export const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation<SessionResponse, AuthFormValues>({
      query: (arg) => ({
        url: '/signin',
        method: 'POST',
        body: arg,
      }),
      transformErrorResponse,
      invalidatesTags: [{ type: 'Category' }, { type: 'Product' }, 'Profile', 'Cart', 'Order'],
    }),
    signUpRTK: build.mutation<SessionResponse, AuthFormValues>({
      query: (arg) => ({
        url: '/signup',
        method: 'POST',
        body: {
          ...arg,
          commandId: COMMAND_ID,
        },
      }),
      transformErrorResponse,
      invalidatesTags: [{ type: 'Category' }, { type: 'Product' }, 'Profile', 'Cart', 'Order'],
    }),
  }),
});

export const { useSignInMutation, useSignUpRTKMutation } = authApi;
export const { signIn, signUpRTK } = authApi.endpoints;
