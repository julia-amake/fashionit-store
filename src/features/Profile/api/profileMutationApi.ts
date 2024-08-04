import { Profile, ProfileRequest } from 'src/entities/Profile';
import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';

const profileApiMutation = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    editProfile: build.mutation<Profile, ProfileRequest>({
      query: (values) => ({
        url: '/profile',
        method: 'PATCH',
        body: values,
      }),
      transformErrorResponse,
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useEditProfileMutation } = profileApiMutation;
