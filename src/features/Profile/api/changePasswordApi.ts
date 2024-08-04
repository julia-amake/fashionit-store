import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils';
import { ChangePasswordRequest, ChangePasswordResponse } from '../model/types/changePasswordTypes';

const changePasswordApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    changePassword: build.mutation<ChangePasswordResponse | null, ChangePasswordRequest>({
      query: (body) => ({
        url: '/profile/change-password',
        method: 'POST',
        body,
      }),
      transformErrorResponse,
    }),
  }),
});

export const { useChangePasswordMutation } = changePasswordApi;
export const { changePassword } = changePasswordApi.endpoints;
