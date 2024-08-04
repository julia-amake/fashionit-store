import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/axios/axiosErrorHandler';
import { Profile } from '../model/types/profileTypes';

export const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchProfile: build.query<Profile, void>({
      query: () => {
        return {
          url: '/profile',
        };
      },
      transformErrorResponse,
      providesTags: ['Profile'],
    }),
  }),
});

export const { useFetchProfileQuery } = profileApi;
export const { fetchProfile } = profileApi.endpoints;
