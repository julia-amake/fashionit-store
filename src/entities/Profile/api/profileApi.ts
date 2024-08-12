import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils/transformErrorResponse';
import { Profile, UpdateProfileBody } from '../model/types/profileTypes';

export const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    fetchProfile: build.query<Profile, void>({
      query: () => {
        return {
          url: '/profile',
        };
      },
      transformErrorResponse,
    }),
    editProfile: build.mutation<Profile, UpdateProfileBody>({
      query: (values) => ({
        url: '/profile',
        method: 'PATCH',
        body: values,
      }),
      async onCacheEntryAdded(arg, { dispatch, cacheDataLoaded }) {
        const result = await cacheDataLoaded;
        dispatch(profileApi.util.upsertQueryData('fetchProfile', undefined, result.data));
      },
      transformErrorResponse,
    }),
  }),
});

export const { useFetchProfileQuery, useEditProfileMutation } = profileApi;
export const { fetchProfile } = profileApi.endpoints;
