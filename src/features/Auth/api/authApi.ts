import { AuthResult } from 'src/features/Auth/model/types/authTypes';
import { AuthFormValues } from 'src/features/Auth/ui/AuthForm/AuthForm';
import { rtkApi } from 'src/shared/api/rtkApi';
import { COMMAND_ID } from 'src/shared/consts/api';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';

export const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    signInRTK: build.mutation<AuthResult, AuthFormValues>({
      query: (arg) => ({
        url: '/signin',
        method: 'POST',
        body: arg,
      }),
      transformErrorResponse,
      invalidatesTags: [{ type: 'Category' }, { type: 'Product' }, 'Profile', 'Cart', 'Order'],
    }),
    signUpRTK: build.mutation<AuthResult, AuthFormValues>({
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

export const { useSignInRTKMutation, useSignUpRTKMutation } = authApi;
export const { signInRTK, signUpRTK } = authApi.endpoints;
