import { rtkApi } from 'src/shared/api/rtkApi';
import { transformErrorResponse } from 'src/shared/lib/utils';

export interface FileUploadResponse {
  url: string;
}

const fileUploadApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation<string, File>({
      query: (file) => {
        const body = new FormData();
        body.append('file', file);

        return {
          url: '/upload',
          method: 'POST',
          body,
        };
      },
      transformErrorResponse,
      transformResponse: (rawResponse: FileUploadResponse) => rawResponse.url,
    }),
  }),
});

export const { useUploadFileMutation } = fileUploadApi;
